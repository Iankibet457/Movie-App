import React, { useState } from 'react';

const NewMovie = ({ onAddMovie }) => {
    const [title, setTitle] = useState('');
    const [directorId, setDirectorId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMovie({ title, director_id: directorId });
        setTitle('');
        setDirectorId('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none flex-1"
            />
            <input
                type="number"
                value={directorId}
                onChange={(e) => setDirectorId(e.target.value)}
                placeholder="Director ID"
                required
                className="px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none w-32"
            />
            <button 
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
                Add Movie
            </button>
        </form>
    );
};

export default NewMovie;
