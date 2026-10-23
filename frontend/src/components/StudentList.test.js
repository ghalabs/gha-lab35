import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudentList from './StudentList';
import studentService from '../services/studentService';
import '@testing-library/jest-dom';

// Mock the studentService module
jest.mock('../services/studentService');

const mockStudents = [
    { _id: '101', name: 'Alice Smith', age: 22, major: 'Science' },
    { _id: '102', name: 'Bob Johnson', age: 21, major: 'Math' },
];

describe('StudentList', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock window.confirm to be consistent across tests
        window.confirm = jest.fn(() => true); 
    });

    it('should show "Loading" initially', () => {
        // Set up mock to return a pending promise
        studentService.getAllStudents.mockReturnValue(new Promise(() => {}));

        render(<StudentList />);
        expect(screen.getByText(/Loading students.../i)).toBeInTheDocument();
    });

    it('should display a list of students upon successful fetch', async () => {
        studentService.getAllStudents.mockResolvedValue({ data: mockStudents });

        render(<StudentList />);

        await waitFor(() => {
            expect(screen.queryByText(/Loading students.../i)).not.toBeInTheDocument();
        });

        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('should display an error message if the API call fails', async () => {
        studentService.getAllStudents.mockRejectedValue(new Error('Network Error'));

        render(<StudentList />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch students/i)).toBeInTheDocument();
        });
        expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    });

    it('should call deleteStudent service when Delete button is clicked', async () => {
        studentService.getAllStudents.mockResolvedValue({ data: mockStudents });
        studentService.deleteStudent.mockResolvedValue({});
        
        render(<StudentList />);

        await waitFor(() => expect(screen.getByText('Alice Smith')).toBeInTheDocument());
        
        const aliceRow = screen.getByText('Alice Smith').closest('tr');
        // Use within to scope the query to the specific row
        const deleteButton = within(aliceRow).getByRole('button', { name: /Delete/i });

        await userEvent.click(deleteButton);

        expect(window.confirm).toHaveBeenCalled();
        
        await waitFor(() => {
            expect(studentService.deleteStudent).toHaveBeenCalledWith('101');
        });
    });

    it('should NOT call deleteStudent service if user cancels confirmation', async () => {
        studentService.getAllStudents.mockResolvedValue({ data: mockStudents });
        studentService.deleteStudent.mockResolvedValue({});
        window.confirm = jest.fn(() => false); // Mock confirm to return false
        
        render(<StudentList />);

        await waitFor(() => expect(screen.getByText('Bob Johnson')).toBeInTheDocument());
        
        const bobRow = screen.getByText('Bob Johnson').closest('tr');
        const deleteButton = within(bobRow).getByRole('button', { name: /Delete/i });

        await userEvent.click(deleteButton);

        expect(window.confirm).toHaveBeenCalled();
        
        // Ensure deleteStudent was NOT called
        expect(studentService.deleteStudent).not.toHaveBeenCalled();
    });
});
