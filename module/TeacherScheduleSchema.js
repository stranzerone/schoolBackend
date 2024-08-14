import mongoose from 'mongoose';


const dailyTimetableSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true
  },
  teacherName: {
    type: String,
   
  },
  slotId:{
   type: String, // Optional field for the classroom
    required:true
  },
  date: {
    type: Date,
  
  },
  classroom: {
    type: String, // Optional field for the classroom
    default: ''
  },
  subject: {
    type: String, // Optional field for the subject
    default: ''
  },
  startTime: {
    type: String, // Use a string in "HH:mm" format
    required: true
  },
  endTime: {
    type: String, // Use a string in "HH:mm" format
  }
  

});

// Create a model from the schema
const DailyTimetable = mongoose.model('DailyTimetable', dailyTimetableSchema);

export default DailyTimetable
