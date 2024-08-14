// routes/timetableRoutes.js

import express from 'express';
import {
  createTimetable,
  getAllTimetables,
  getTimetableById,
  updateTimetable,
  deleteTimetable,
  getClassTimeTable
} from '../Controller/TImeTableController.js'; // Adjust the import path as needed
import { verifyPrincipal, verifyStudent, verifyTeacher } from '../Authentication/Auth.js';

const router = express.Router();

// Route to create a new timetable
router.post('/', verifyPrincipal,createTimetable);

// Route to get all timetables
router.get('/',verifyStudent, getAllTimetables);
//Route to get classs schedule
router.get('/classTimeTable/:id',verifyStudent, getClassTimeTable);

// Route to get a specific timetable by ID
router.get('/:id', verifyStudent,getTimetableById);

// Route to update a timetable by ID
router.put('/:id',verifyTeacher,updateTimetable);

// Route to delete a timetable by ID
router.delete('/:id',verifyPrincipal,deleteTimetable);

export default router;
