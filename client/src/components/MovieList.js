import React, { useState } from 'react';

const MovieList = ({ movies, onDeleteMovie, onSelectMovie, onUpdateMovie }) => {
    const [editingMovie, setEditingMovie] = useState(null);
    const [title, setTitle] = useState('');
    const [directorId, setDirectorId] = useState('');

    const handleEdit = (movie) => {
        setEditingMovie(movie.id);
        setTitle(movie.title);
        setDirectorId(movie.director_id);
    };

    const handleUpdate = (id) => {
        onUpdateMovie({ id, title, director_id: directorId });
        setEditingMovie(null);
        setTitle('');
        setDirectorId('');
    };

    return (
        <ul className="space-y-2">
            {movies.map((movie) => (
                <li key={movie.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4" onClick={() => onSelectMovie(movie.id)}>
                    {editingMovie === movie.id ? (
                        <div>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                            <input value={directorId} onChange={(e) => setDirectorId(e.target.value)} placeholder="Director ID" />
                            <button onClick={(e) => {
                                e.stopPropagation();
                                handleUpdate(movie.id);
                            }}>Update</button>
                        </div>
                    ) : (
                        <span>{movie.title} (Director: {movie.director})</span>
                    )}
                    <div>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(movie);
                        }}>Edit</button>
                        <button className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-700" onClick={(e) => {
                            e.stopPropagation();
                            onDeleteMovie(movie.id);
                        }}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
