import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// import Search from './components/Search';
import DirectorList from './components/DirectorList';
import MovieList from './components/MovieList';
import NewDirector from './components/NewDirector';
import NewMovie from './components/NewMovie';
import ReviewList from './components/ReviewList';
// import Header from './components/Header';
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
        const directorToAdd = {
            name: newDirector.name,
            age: newDirector.age ? parseInt(newDirector.age) : null,
            gender: newDirector.gender || null
        };

        fetch('https://movie-deployment-1.onrender.com/api/directors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(directorToAdd),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setDirectors(prevDirectors => [...prevDirectors, data]);
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const directorName = directors.find(d => d.id === parseInt(newMovie.director_id))?.name;
            const movieWithDirector = {
                ...data,
                director: directorName
            };
            setMovies(prevMovies => [...prevMovies, movieWithDirector]);
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
            body: JSON.stringify({
                name: updatedDirector.name,
                age: updatedDirector.age,
                gender: updatedDirector.gender
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setDirectors(prevDirectors => 
                prevDirectors.map(director => 
                    director.id === updatedDirector.id ? data : director
                )
            );
        })
        .catch(error => {
            console.error('Error updating director:', error);
            alert('Failed to update director. Please try again.');
        });
    };

    const handleUpdateMovie = (updatedMovie) => {
        fetch(`https://movie-deployment-1.onrender.com/api/movies/${updatedMovie.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: updatedMovie.title,
                director_id: updatedMovie.director_id
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const directorName = directors.find(d => d.id === parseInt(updatedMovie.director_id))?.name;
            const movieWithDirector = {
                ...data,
                director: directorName
            };
            setMovies(prevMovies => 
                prevMovies.map(movie => 
                    movie.id === updatedMovie.id ? movieWithDirector : movie
                )
            );
        })
        .catch(error => {
            console.error('Error updating movie:', error);
            alert('Failed to update movie. Please try again.');
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">🎬 Movie App</h1>
                    <div className="space-x-6">
                        <NavLink to="/" className={({ isActive }) => 
                            `transition-colors px-4 py-2 rounded-lg ${isActive ? "bg-white text-blue-600" : "hover:bg-blue-700"}`
                        }>Home</NavLink>
                        <NavLink to="/movies" className={({ isActive }) => 
                            `transition-colors px-4 py-2 rounded-lg ${isActive ? "bg-white text-blue-600" : "hover:bg-blue-700"}`
                        }>Movies</NavLink>
                        <NavLink to="/about" className={({ isActive }) => 
                            `transition-colors px-4 py-2 rounded-lg ${isActive ? "bg-white text-blue-600" : "hover:bg-blue-700"}`
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
                                <section className="bg-white rounded-xl shadow-md p-6 mb-8">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                                        <span className="mr-2">🎭</span> Directors
                                    </h2>
                                    <input
                                        type="text"
                                        value={searchDirector}
                                        onChange={(e) => setSearchDirector(e.target.value)}
                                        placeholder="Search Directors"
                                        className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
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
