import React, { useState, useCallback } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
    // State to force refresh StudentList when a new student is added
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Callback function passed to the form to trigger list refresh
    const handleStudentAdded = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
        console.log('New student added, triggering list refresh.');
    }, []);

    return (
        <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Student Management Dashboard </h1>
            
            <section style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
                <StudentForm onStudentAdded={handleStudentAdded} />
            </section>
            
            <hr />
            
            <section style={{ marginTop: '20px' }}>
                {/* Pass the key to force re-render when refreshTrigger changes */}
                <StudentList key={refreshTrigger} refreshTrigger={refreshTrigger} />
            </section>
        </div>
    );
}

export default App;
