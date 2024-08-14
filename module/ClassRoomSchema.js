import mongoose from "mongoose"

const classRoomSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    trim: true,
  },
  slotId:{
type:String,
require:true
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String, // Store as a string in HH:MM format
    required: true,
  },
  endTime: {
    type: String, // Store as a string in HH:MM format
    required: true,
  },
  openDays: {
    mon: {
      type: Boolean,
      default: false,
    },
    tue: {
      type: Boolean,
      default: false,
    },
    wed: {
      type: Boolean,
      default: false,
    },
    thu: {
      type: Boolean,
      default: false,
    },
    fri: {
      type: Boolean,
      default: false,
    },
    sat: {
      type: Boolean,
      default: false,
    },
    sun: {
      type: Boolean,
      default: false,
    },
  },
  classTeacher: {
    type: String,
   
    trim: true,
  },
})

const  classroom = mongoose.model('ClassRooms', classRoomSchema);

export default classroom;