import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudentForm from './StudentForm';
import studentService from '../services/studentService';
import '@testing-library/jest-dom';


// Mock the service
jest.mock('../services/studentService');

describe('StudentForm', () => {
    const mockOnStudentAdded = jest.fn();
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully submit the form and clear fields', async () => {
        // 1. Setup userEvent
        const user = userEvent.setup();
        
        // 2. Mock successful API response
        studentService.createStudent.mockResolvedValue({ 
            data: { name: 'Sam', age: 25, major: 'IT' } 
        });

        render(<StudentForm onStudentAdded={mockOnStudentAdded} />);
        
        const nameInput = screen.getByLabelText(/Name:/i);
        const ageInput = screen.getByLabelText(/Age:/i);
        const majorInput = screen.getByLabelText(/Major:/i);
        const submitButton = screen.getByRole('button', { name: /Add Student/i });

        // 3. Await all typing actions
        await user.type(nameInput, 'Sam');
        await user.type(ageInput, '25');
        await user.type(majorInput, 'IT');

        // 4. Await the click
        await user.click(submitButton);

        // 5. Use waitFor to catch the state updates (setMessage, setName, etc.)
        await waitFor(() => {
            expect(studentService.createStudent).toHaveBeenCalledWith({
                name: 'Sam',
                age: 25,
                major: 'IT'
            });
            // This assertion ensures we wait until the "Success" state is rendered
            expect(screen.getByText(/Student added successfully/i)).toBeInTheDocument();
        });

        // 6. Verify form is cleared
        expect(nameInput.value).toBe('');
        expect(mockOnStudentAdded).toHaveBeenCalledTimes(1);
    });

    it('should display an error message on API failure', async () => {
        const user = userEvent.setup();
        studentService.createStudent.mockRejectedValue({ 
            response: { data: { message: 'Invalid Data' } } 
        });

        render(<StudentForm onStudentAdded={mockOnStudentAdded} />);
        
        await user.type(screen.getByLabelText(/Name:/i), 'Fail');
        await user.type(screen.getByLabelText(/Age:/i), '20');
        await user.type(screen.getByLabelText(/Major:/i), 'CS');
        await user.click(screen.getByRole('button', { name: /Add Student/i }));

        // Wait for the error state to appear
        await waitFor(() => {
            expect(screen.getByText(/Error: Invalid Data/i)).toBeInTheDocument();
        });
    });
});