import React, { useEffect, useState } from 'react';

import Search from './components/Search';
import DirectorList from './components/DirectorList';
import MovieList from './components/MovieList';
import NewDirector from './components/NewDirector';
import NewMovie from './components/NewMovie';
import ReviewList from './components/ReviewList';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
    const [directors, setDirectors] = useState([]);
    const [movies, setMovies] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [searchDirector, setSearchDirector] = useState("");
    const [searchMovie, setSearchMovie] = useState("");

    useEffect(() => {
        fetch("https://movie-deployment-1.onrender.com/api/directors")
            .then((response) => response.json())
            .then((data) => setDirectors(data));
    }, []);

    useEffect(() => {
        fetch("https://movie-deployment-1.onrender.com/api/movies")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setMovies(data);
                } else {
                    console.error('Expected an array but got:', data);
                }
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const fetchReviews = (movieId) => {
        fetch(`https://movie-deployment-1.onrender.com/api/movies/${movieId}/reviews`)
            .then((response) => response.json())
            .then((data) => setReviews(data));
    };

    const handleSelectMovie = (movieId) => {
        setSelectedMovieId(movieId);
        fetchReviews(movieId);
    };

    const handleAddReview = (newReview) => {
        if (selectedMovieId) {
            fetch(`https://movie-deployment-1.onrender.com/api/movies/${selectedMovieId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            })
            .then(response => response.json())
            .then(data => {
                setReviews([...reviews, { ...newReview, id: data.id }]);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    };

    const handleDeleteReview = (id) => {
        fetch(`https://movie-deployment-1.onrender.com/api/reviews/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            setReviews(reviews.filter(review => review.id !== id));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const displayedDirectors = directors.filter((director) =>
        director?.name?.toLowerCase().includes(searchDirector.toLowerCase())
    );

    const displayedMovies = movies.filter((movie) =>
        movie?.title?.toLowerCase().includes(searchMovie.toLowerCase())
    );

    const handleAddDirector = (newDirector) => {
        fetch("https://movie-deployment-1.onrender.com/api/directors", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDirector),
        })
        .then(response => response.json())
        .then(data => {
            
            setDirectors([...directors, { ...newDirector, id: data.id }]);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const handleAddMovie = (newMovie) => {
        fetch("https://movie-deployment-1.onrender.com/api/movies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        })
        .then(response => response.json())
        .then(data => {
           
            setMovies([...movies, { ...newMovie, id: data.id }]);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const handleDeleteDirector = (id) => {
    fetch(`https://movie-deployment-1.onrender.com/api/directors/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        setDirectors(directors.filter(director => director.id !== id));
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
};

    const handleDeleteMovie = (id) => {
        fetch(`https://movie-deployment-1.onrender.com/api/movies/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            setMovies(movies.filter(movie => movie.id !== id));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const handleUpdateDirector = (updatedDirector) => {
        fetch(`https://movie-deployment-1.onrender.com/api/directors/${updatedDirector.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDirector),
        })
        .then(response => response.json())
        .then(() => {
            setDirectors(directors.map(director => director.id === updatedDirector.id ? updatedDirector : director));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const handleUpdateMovie = (updatedMovie) => {
        fetch(`https://movie-deployment-1.onrender.com/api/movies/${updatedMovie.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        })
        .then(response => response.json())
        .then(() => {
            setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    return (
        
        <main className="max-w-4xl mx-auto p-4 bg-gray-100">
            <Header/>
            
            <h2 className="text-2xl font-bold mb-4">Directors</h2>
            <input
                type="text"
                value={searchDirector}
                onChange={(e) => setSearchDirector(e.target.value)}
                placeholder="Search Directors"
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <NewDirector onAddDirector={handleAddDirector} />
            <DirectorList directors={displayedDirectors} onDeleteDirector={handleDeleteDirector} onUpdateDirector={handleUpdateDirector} />
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Movies</h2>
            <input
                type="text"
                value={searchMovie}
                onChange={(e) => setSearchMovie(e.target.value)}
                placeholder="Search Movies"
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            
            <NewMovie onAddMovie={handleAddMovie} />
            <MovieList movies={displayedMovies} onDeleteMovie={handleDeleteMovie} onSelectMovie={handleSelectMovie} onUpdateMovie={handleUpdateMovie} />
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>
            {selectedMovieId && (
                <ReviewList 
                    reviews={reviews} 
                    onAddReview={handleAddReview} 
                    onDeleteReview={handleDeleteReview} 
                />
            )}
        </main>
    );
};

export default App;
