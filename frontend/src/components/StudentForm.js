import React, { useState } from 'react';
import studentService from '../services/studentService';

const StudentForm = ({ onStudentAdded }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [major, setMajor] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Error: ${errorMsg}');
        setIsError(true);

        if (!name || !age || !major) {
            setMessage('All fields are required.');
            setIsError(true);
            return;
        }

        try {
            const newStudent = { name, age: parseInt(age), major };
            await studentService.createStudent(newStudent);
            
            setMessage('Student added successfully!');
            setIsError(false);
            
            // Clear the form
            setName('');
            setAge('');
            setMajor('');
            
            // Trigger the list refresh in the parent (App.js)
            if (onStudentAdded) {
                onStudentAdded(); 
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to add student. Please check input.';
            setMessage(`Error: ${errorMsg}`);
            setIsError(true);
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Add New Student ➕</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <div>
                    <label htmlFor="name-input">Name:</label>
                    <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="age-input">Age:</label>
                    <input id="age-input" type="number" value={age} onChange={(e) => setAge(e.target.value)} required min="5" />
                </div>
                <div>
                    <label htmlFor="major-input">Major:</label>
                    <input id="major-input" type="text" value={major} onChange={(e) => setMajor(e.target.value)} required />
                </div>
                <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Add Student
                </button>
            </form>
            {message && (
                <p style={{ color: isError ? 'red' : 'green', fontWeight: 'bold', marginTop: '10px' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default StudentForm;
