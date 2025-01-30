import React from 'react';

const DirectorList = ({ directors, onDeleteDirector }) => {
    return (
        <ul className="space-y-2">
            {directors.map((director) => (
                <li key={director.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
                    <span>{director.name} (Age: {director.age}, Gender: {director.gender})</span>
                    <button className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-700" onClick={() => onDeleteDirector(director.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default DirectorList;
