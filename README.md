# Movie-App

A full-stack web application for managing movies, directors, and reviews. Built with React and Flask.

## Features

- Create, read, update, and delete movies
- Manage director information
- Add and manage movie reviews
- Search functionality for movies and directors
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Heroicons

### Backend
- Flask
- SQLAlchemy
- Flask-Migrate
- SQLite Database

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at (https://moringamovie.netlify.app/)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install flask flask-sqlalchemy flask-cors flask-migrate
```

4. Initialize the database:
```bash
flask db upgrade
python seed.py
```

5. Start the Flask server:
```bash
python app.py
```

The backend API will be available at https://movie-deployment-1.onrender.com

## API Endpoints

### Directors
- GET `/api/directors` - Get all directors
- POST `/api/directors` - Create a new director
- PUT `/api/directors/:id` - Update a director
- DELETE `/api/directors/:id` - Delete a director

### Movies
- GET `/api/movies` - Get all movies
- POST `/api/movies` - Create a new movie
- PUT `/api/movies/:id` - Update a movie
- DELETE `/api/movies/:id` - Delete a movie

### Reviews
- GET `/api/movies/:id/reviews` - Get reviews for a movie
- POST `/api/movies/:id/reviews` - Create a new review
- PUT `/api/reviews/:id` - Update a review
- DELETE `/api/reviews/:id` - Delete a review

## Deployment

The application is configured for deployment:

- Frontend is configured for Netlify deployment
- Backend can be deployed to any Python-supporting platform (e.g., Render)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
