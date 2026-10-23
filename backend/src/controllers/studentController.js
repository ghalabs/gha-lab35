const Student = require('../models/student');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (err) {
        // Handle invalid MongoDB ID format errors
        if (err.kind === 'ObjectId') {
             return res.status(404).json({ message: 'Student not found' });
        }
        res.status(500).json({ message: err.message });
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    const { name, age, major } = req.body;
    const student = new Student({
        name,
        age,
        major
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        // Handle validation errors (missing fields, min age)
        res.status(400).json({ message: err.message });
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        Object.assign(student, req.body);
        const updatedStudent = await student.save();
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        // Use findByIdAndDelete to get the document and delete it in one go
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
