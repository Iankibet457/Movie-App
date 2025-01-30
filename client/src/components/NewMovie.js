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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="number"
                value={directorId}
                onChange={(e) => setDirectorId(e.target.value)}
                placeholder="Director ID"
                required
            />
            <button type="submit">Add Movie</button>
        </form>
    );
};

export default NewMovie;
