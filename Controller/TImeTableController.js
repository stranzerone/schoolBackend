// controllers/timetableController.js

import DailyTimetable from '../module/TeacherScheduleSchema.js'; // Adjust the import path as needed
// Create a new timetable entry
export const createTimetable = async (req, res) => {
  try {
    const data = req.body
    const slotId = data.classroom+data.teacherId+data.startTime;
    const timetable = new DailyTimetable({slotId:slotId,teacherId:data.teacherId,classroom:data.classroom,startTime:data.startTime,endTime:data.startTime,subject:data.subject,teacherName:data.teacherName});
    await timetable.save();
    
    res.status(201).json(timetable);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all timetable entries
export const getAllTimetables = async (req, res) => {
  try {
    const timetables = await DailyTimetable.find();
    console.log(timetables)
    res.status(200).json(timetables);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a timetable by ID
export const getTimetableById = async (req, res) => {
  try {
  
    const {id}  = req.params
   console.log(id)
    const timetable = await DailyTimetable.find({teacherId:id});
   
    if (!timetable) return res.status(404).json({ error: 'Timetable not found' });
    res.status(200).json(timetable);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

export const getClassTimeTable = async (req, res) => {
  try {
  
    const {id}  = req.params
   console.log(id)
    const timetable = await DailyTimetable.find({classroom:id});
   
    if (!timetable) return res.status(404).json({ error: 'Timetable not found' });
    res.status(200).json(timetable);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

// Update a timetable entry by ID
export const updateTimetable = async (req, res) => {
  try {
    const timetable = await DailyTimetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!timetable) return res.status(404).json({ error: 'Timetable not found' });
    res.status(200).json(timetable);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a timetable entry by ID
export const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(id); // This will log the id received from the request parameters

    // Correct usage: passing objectId directly to findByIdAndDelete
    const timetable = await DailyTimetable.findOneAndDelete({slotId:id});

    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }

    res.status(200).json({ message: 'Timetable deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
