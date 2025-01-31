import React, { useState } from 'react';

const DirectorList = ({ directors, onDeleteDirector, onUpdateDirector }) => {
    const [editingDirector, setEditingDirector] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const handleEdit = (director) => {
        setEditingDirector(director.id);
        setName(director.name);
        setAge(director.age);
        setGender(director.gender);
    };

    const handleUpdate = (id) => {
        onUpdateDirector({ id, name, age, gender });
        setEditingDirector(null);
        setName('');
        setAge('');
        setGender('');
    };

    return (
        <ul className="space-y-2">
            {directors.map((director) => (
                <li key={director.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
                    {editingDirector === director.id ? (
                        <div>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                            <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
                            <input value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
                            <button onClick={() => handleUpdate(director.id)}>Update</button>
                        </div>
                    ) : (
                        <span>{director.name} (Age: {director.age}, Gender: {director.gender})</span>
                    )}
                    <div>
                        <button onClick={() => handleEdit(director)}>Edit</button>
                        <button onClick={() => onDeleteDirector(director.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default DirectorList;
