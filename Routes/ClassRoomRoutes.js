import express from 'express';
import { 
  createClassRoom, 
  getClassRooms, 
  getClassRoomById, 
  updateClassRoom, 
  deleteClassRoom 
} from '../Controller/ClassRoomController.js';
import { verifyPrincipal, verifyStudent, verifyTeacher } from '../Authentication/Auth.js';

const router = express.Router();

// Route for creating a new classroom
router.post('/',verifyPrincipal ,createClassRoom);

// Route for getting all classrooms
router.get('/',getClassRooms);

// Route for getting a single classroom by ID
router.get('/:id',verifyStudent,getClassRoomById);

// Route for updating a classroom by ID
router.put('/:id',verifyPrincipal, updateClassRoom);

// Route for deleting a classroom by ID
router.delete('/:id',verifyPrincipal,deleteClassRoom);

export default router;
