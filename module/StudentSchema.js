import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
studentId:{
type:String,
required:true,
unique:true
},
  rollNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  },
  studentClass: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,

    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,

    trim: true,
  },
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
