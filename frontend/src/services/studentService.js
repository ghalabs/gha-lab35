import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students'; // Backend API URL

const getAllStudents = () => {
    return axios.get(API_URL);
};

const getStudentById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createStudent = (student) => {
    return axios.post(API_URL, student);
};

const updateStudent = (id, student) => {
    return axios.put(`${API_URL}/${id}`, student);
};

const deleteStudent = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const studentService = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};

export default studentService;
