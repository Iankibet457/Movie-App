import React, { useState } from 'react';

const NewDirector = ({ onAddDirector }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDirector = {
            name: name.trim(),
            age: age ? parseInt(age) : null,
            gender: gender.trim() || null
        };
        onAddDirector(newDirector);
        setName('');
        setAge('');
        setGender('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="border border-gray-300 rounded-lg p-2 w-full mb-2"
            />
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="border border-gray-300 rounded-lg p-2 w-full mb-2"
            />
            <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
                className="border border-gray-300 rounded-lg p-2 w-full mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Add Director</button>
        </form>
    );
};

export default NewDirector;
