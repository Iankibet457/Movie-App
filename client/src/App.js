import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// import Search from './components/Search';
import DirectorList from './components/DirectorList';
import MovieList from './components/MovieList';
import NewDirector from './components/NewDirector';
import NewMovie from './components/NewMovie';
import ReviewList from './components/ReviewList';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
    const [directors, setDirectors] = useState([]);
    const [movies, setMovies] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [searchDirector, setSearchDirector] = useState("");
    const [searchMovie, setSearchMovie] = useState("");

    useEffect(() => {
        // Fetch directors
        fetch('https://movie-deployment-1.onrender.com/api/directors')
            .then(response => response.json())
            .then(data => setDirectors(data))
            .catch(error => console.error('Error fetching directors:', error));

        // Fetch movies
        fetch('https://movie-deployment-1.onrender.com/api/movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
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
        fetch('https://movie-deployment-1.onrender.com/api/directors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDirector),
        })
        .then(response => response.json())
        .then(data => {
            setDirectors([...directors, data]);
        })
        .catch(error => {
            console.error('Error adding director:', error);
        });
    };

    const handleAddMovie = (newMovie) => {
        fetch('https://movie-deployment-1.onrender.com/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        })
        .then(response => response.json())
        .then(data => {
            setMovies([...movies, data]);
        })
        .catch(error => {
            console.error('Error adding movie:', error);
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
            console.error('Error deleting director:', error);
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
            console.error('Error deleting movie:', error);
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setDirectors(directors.map(director => 
                director.id === updatedDirector.id ? data : director
            ));
        })
        .catch(error => {
            console.error('Error updating director:', error);
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
            console.error('Error updating movie:', error);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 text-white p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Movie App</h1>
                    <div className="space-x-4">
                        <NavLink to="/" className={({ isActive }) => 
                            isActive ? "text-blue-200" : "hover:text-blue-200"
                        }>Home</NavLink>
                        <NavLink to="/movies" className={({ isActive }) => 
                            isActive ? "text-blue-200" : "hover:text-blue-200"
                        }>Movies</NavLink>
                        <NavLink to="/about" className={({ isActive }) => 
                            isActive ? "text-blue-200" : "hover:text-blue-200"
                        }>About</NavLink>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/movies" element={
                        <>
                            <div className="space-y-8">
                                <section>
                                    <h2 className="text-2xl font-bold mb-4">Directors</h2>
                                    <input
                                        type="text"
                                        value={searchDirector}
                                        onChange={(e) => setSearchDirector(e.target.value)}
                                        placeholder="Search Directors"
                                        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                                    />
                                    <NewDirector onAddDirector={handleAddDirector} />
                                    <DirectorList 
                                        directors={displayedDirectors} 
                                        onDeleteDirector={handleDeleteDirector} 
                                        onUpdateDirector={handleUpdateDirector} 
                                    />
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">Movies</h2>
                                    <input
                                        type="text"
                                        value={searchMovie}
                                        onChange={(e) => setSearchMovie(e.target.value)}
                                        placeholder="Search Movies"
                                        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                                    />
                                    <NewMovie onAddMovie={handleAddMovie} />
                                    <MovieList 
                                        movies={displayedMovies} 
                                        onDeleteMovie={handleDeleteMovie} 
                                        onSelectMovie={handleSelectMovie} 
                                        onUpdateMovie={handleUpdateMovie} 
                                    />
                                </section>

                                {selectedMovieId && (
                                    <section>
                                        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                                        <ReviewList 
                                            reviews={reviews} 
                                            onAddReview={handleAddReview} 
                                            onDeleteReview={handleDeleteReview}
                                        />
                                    </section>
                                )}
                            </div>
                        </>
                    } />
                </Routes>
            </main>
        </div>
    );
};

export default App;
