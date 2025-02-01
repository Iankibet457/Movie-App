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
        // Validate inputs
        if (!name.trim()) {
            alert('Name is required');
            return;
        }
        
        const updatedDirector = {
            id,
            name: name.trim(),
            age: age ? parseInt(age) : null,
            gender: gender.trim() || null
        };
        
        onUpdateDirector(updatedDirector);
        setEditingDirector(null);
        setName('');
        setAge('');
        setGender('');
    };

    return (
        <ul className="space-y-3">
            {directors.map((director) => (
                <li key={director.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    {editingDirector === director.id ? (
                        <div className="flex gap-4 items-center">
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Name"
                                className="px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <input 
                                value={age} 
                                onChange={(e) => setAge(e.target.value)} 
                                placeholder="Age"
                                className="px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none w-20"
                            />
                            <input 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)} 
                                placeholder="Gender"
                                className="px-3 py-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button 
                                onClick={() => handleUpdate(director.id)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-medium text-gray-800">{director.name}</span>
                            <span className="text-sm text-gray-500">Age: {director.age}</span>
                            <span className="text-sm text-gray-500">Gender: {director.gender}</span>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleEdit(director)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => onDeleteDirector(director.id)}
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

export default DirectorList;
