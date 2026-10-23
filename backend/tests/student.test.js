const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); 
const Student = require('../src/models/student');

let dbUri = 'mongodb://localhost:27017/student_sms_test'; 

// Before all tests, connect to the test database
beforeAll(async () => {
    // This connects to the test database
    await mongoose.connect(dbUri); 
});

// After each test, clear the database to ensure test isolation
afterEach(async () => {
    await Student.deleteMany({});
});

// After all tests, close the database connection
afterAll(async () => {
    // Closing the connection is crucial for Jest to exit cleanly
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
    }
});

describe('Student API', () => {
    const studentData = {
        name: 'Jane Doe',
        age: 20,
        major: 'History'
    };

    it('POST /api/students - should create a new student', async () => {
        const res = await request(app)
            .post('/api/students')
            .send(studentData);
            
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe(studentData.name);
    });

    it('GET /api/students - should get all students', async () => {
        await Student.create(studentData);
        await Student.create({ name: 'Bob Johnson', age: 21, major: 'Math' });

        const res = await request(app).get('/api/students');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].name).toBe(studentData.name);
    });

    it('GET /api/students/:id - should get a student by ID', async () => {
        const student = await Student.create(studentData);

        const res = await request(app).get(`/api/students/${student._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe(studentData.name);
    });

    it('PUT /api/students/:id - should update a student', async () => {
        const student = await Student.create(studentData);

        const res = await request(app)
            .put(`/api/students/${student._id}`)
            .send({ major: 'Chemistry' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.major).toBe('Chemistry');
    });

    it('DELETE /api/students/:id - should delete a student', async () => {
        const student = await Student.create(studentData);

        const res = await request(app).delete(`/api/students/${student._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Student deleted successfully!');

        // Check if it was actually deleted
        const deletedStudent = await Student.findById(student._id);
        expect(deletedStudent).toBeNull();
    });

    it('GET /api/students/:id - should return 404 for non-existent ID', async () => {
        const nonExistentId = '60c72b2f9b1d8f0015f8a2b3'; 
        const res = await request(app).get(`/api/students/${nonExistentId}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('Student not found');
    });
});