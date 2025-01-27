from app import app, db
from models import Director, Movie, Review
from datetime import datetime

def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Add sample directors
        director1 = Director(name="Christopher Nolan")
        director2 = Director(name="Martin Scorsese")
        
        db.session.add_all([director1, director2])
        db.session.commit()

        # Add sample movies
        movie1 = Movie(
            title="Inception",
            release_date=datetime.strptime("2010-07-16", "%Y-%m-%d").date(),
            director_id=director1.id
        )
        movie2 = Movie(
            title="The Departed",
            release_date=datetime.strptime("2006-10-06", "%Y-%m-%d").date(),
            director_id=director2.id
        )
        
        db.session.add_all([movie1, movie2])
        db.session.commit()

        # Add sample reviews
        review1 = Review(
            content="A masterpiece of modern cinema",
            rating=5,
            movie_id=movie1.id
        )
        review2 = Review(
            content="Brilliant performances all around",
            rating=5,
            movie_id=movie2.id
        )
        
        db.session.add_all([review1, review2])
        db.session.commit()

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully!")