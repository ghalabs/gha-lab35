import React, { useEffect, useState } from 'react';
import studentService from '../services/studentService';

const StudentList = ({ refreshTrigger }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await studentService.getAllStudents();
            setStudents(response.data);
        } catch (err) {
            setError('Failed to fetch students. Is the backend running on port 5000?');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [refreshTrigger]); // Re-run fetch when refreshTrigger changes

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await studentService.deleteStudent(id);
                // Optimistically remove from state or re-fetch
                fetchStudents(); 
            } catch (err) {
                setError('Failed to delete student.');
                console.error(err);
            }
        }
    };

    if (loading) return <p>Loading students... </p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div>
            <h2>Student List </h2>
            {students.length === 0 ? (
                <p>No students available. Add some! </p>
            ) : (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px' }}>Name</th>
                            <th style={{ padding: '8px' }}>Age</th>
                            <th style={{ padding: '8px' }}>Major</th>
                            <th style={{ padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td style={{ padding: '8px' }}>{student.name}</td>
                                <td style={{ padding: '8px' }}>{student.age}</td>
                                <td style={{ padding: '8px' }}>{student.major}</td>
                                <td style={{ padding: '8px' }}>
                                    {/* Edit button placeholder */}
                                    <button 
                                        onClick={() => alert(`Editing ${student.name}`)}
                                        style={{ marginRight: '5px' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(student._id)}
                                        style={{ backgroundColor: 'red', color: 'white', border: 'none' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StudentList;
