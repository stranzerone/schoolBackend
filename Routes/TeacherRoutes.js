import express from 'express';
import { 
  createTeacher, 
  getTeachers, 
  getTeacherById, 
  updateTeacher, 
  deleteTeacher, 
  teacherLogin,
  principalLogin
} from "../Controller/TeacherController.js"
import { verifyTeacher } from '../Authentication/Auth.js';

const router = express.Router();

// Route for creating a new teacher
router.post('/', createTeacher);

router.post('/teacherLogin',teacherLogin)

router.post('/principalLogin',principalLogin)
// Route for getting all teachers
router.get('/',verifyTeacher ,getTeachers);

// Route for getting a single teacher by ID
router.get('/:id',verifyTeacher,getTeacherById);

// Route for updating a teacher by ID
router.put('/:id',verifyTeacher ,updateTeacher);

// Route for deleting a teacher by ID
router.delete('/:id',verifyTeacher ,deleteTeacher);

export default router;
