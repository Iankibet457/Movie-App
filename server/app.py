from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Director, Movie, Review, Rating
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)

@app.route('/api/directors', methods=['POST'])
def create_director():
    data = request.get_json()
    director = Director(
        name=data['name'],
        age=data.get('age'),
        gender=data.get('gender')
    )
    db.session.add(director)
    db.session.commit()
    return jsonify({'message': 'Director created successfully'}), 201

@app.route('/api/movies', methods=['POST'])
def create_movie():
    data = request.get_json()
    movie = Movie(
        title=data['title'],
        director_id=data['director_id']
    )
    db.session.add(movie)
    db.session.commit()
    return jsonify({'message': 'Movie created successfully'}), 201

@app.route('/api/movies', methods=['GET'])
def get_movies():
    movies = Movie.query.all()
    return jsonify([{
        'id': movie.id,
        'title': movie.title,
        'director': movie.director.name
    } for movie in movies])

@app.route('/api/directors/<int:director_id>/movies', methods=['GET'])
def get_director_movies(director_id):
    movies = Movie.query.filter_by(director_id=director_id).all()
    return jsonify([{
        'id': movie.id,
        'title': movie.title
    } for movie in movies])

@app.route('/api/movies/<int:movie_id>/reviews', methods=['POST'])
def create_review(movie_id):
    data = request.get_json()
    
    # First create the rating
    rating = Rating(
        movie_id=movie_id,
        rating=data['rating']
    )
    db.session.add(rating)
    db.session.commit()
    
    # Then create the review
    review = Review(
        movie_id=movie_id,
        rating_id=rating.id,
        review=data['review']
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({'message': 'Review and rating created successfully'}), 201

@app.route('/api/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    review = Review.query.get_or_404(review_id)
    data = request.get_json()
    review.review = data.get('review', review.review)
    db.session.commit()
    return jsonify({'message': 'Review updated successfully'})

@app.route('/api/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)
    # Get associated rating
    rating = Rating.query.get(review.rating_id)
    if rating:
        db.session.delete(rating)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully'})

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
