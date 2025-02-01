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
        <ul className="space-y-3">
            {movies.map((movie) => (
                <li key={movie.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => onSelectMovie(movie.id)}>
                    {editingMovie === movie.id ? (
                        <div className="flex gap-4 items-center">
                            <input 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                placeholder="Title"
                                className="px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <input 
                                value={directorId} 
                                onChange={(e) => setDirectorId(e.target.value)} 
                                placeholder="Director ID"
                                className="px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none w-24"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdate(movie.id);
                                }}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-medium text-gray-800">{movie.title}</span>
                            <span className="text-sm text-gray-500">Director: {movie.director}</span>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(movie);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteMovie(movie.id);
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
