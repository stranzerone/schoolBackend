import express from "express"





import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  studentLogin,
  getStudentByClassName
} from '../Controller/StudentController.js';
import { verifyStudent, verifyTeacher } from "../Authentication/Auth.js";




const router = express.Router();

// @route   POST /api/students
// @desc    Create a new student
// @access  Public
router.post('/students',createStudent);
router.post('/studentLogin',studentLogin)
// @route   GET /api/students
// @desc    Get all students
// @access  Public
router.get('/students', getStudents);

// @route   GET /api/students/:id
// @desc    Get a student by ID
// @access  Public
router.get('/students/:id',verifyStudent,getStudentById);





router.get('/studentsByClassName/:className',verifyStudent,getStudentByClassName);


// @route   PUT /api/students/:id
// @desc    Update a student by ID
// @access  Public
router.put('/students/:id', verifyTeacher,updateStudent);

// @route   DELETE /api/students/:id
// @desc    Delete a student by ID
// @access  Public
router.delete('/students/:id',verifyTeacher,deleteStudent);






export default router;