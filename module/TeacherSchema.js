import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
    trim: true,
  },
  teacherId:{
    type: String,
    required: true,
    unique:true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },

  className:{
    type:String,
  },
  dateOfBirth:{
    type:String,
  }
}, {
  timestamps: true,
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
