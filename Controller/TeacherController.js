import Teacher from '../module/TeacherSchema.js';
import jwt from "jsonwebtoken"

// Create a new teacher

const secretKey =process.env.SECRET_KEY;

export const teacherLogin =async(req,res)=>{


  try{

const {teacherId,dateOfBirth} = req.body

const teacher = await Teacher.findOne({teacherId:teacherId,dateOfBirth:dateOfBirth})

if(teacher){

  const payload = { user: teacherId, role: "teacher" };
  const options = { expiresIn: "2h" };
  const token = jwt.sign(payload, secretKey, options);

  // Set the token in a cookie
  res.cookie('token', token, {
    maxAge: 9000000, // Cookie expiration time in milliseconds
    httpOnly: true, // Cookie cannot be accessed via JavaScript
    sameSite: 'Strict', // Ensures cookies are sent with cross-origin requests
    secure: true, // Set to true if using HTTPS
    path: '/' // Path where the cookie is available
  });
  res.status(201).json("teacher "+ payload.user)
}


  }catch(error){
    console.error(error)
    res.status(404).json("teacher not found")
  }
}






export const principalLogin =async(req,res)=>{


  try{

const {username,password} = req.body


if(username=="principal@classroom.com" && password=="Admin"){


  const payload = { user: username, role: "principal" };
  const options = { expiresIn: "2h" };
  const token = jwt.sign(payload, secretKey, options);

  // Set the token in a cookie
  res.cookie('token', token, {
    maxAge: 9000000, // Cookie expiration time in milliseconds
    httpOnly: true, // Cookie cannot be accessed via JavaScript
    sameSite: 'Strict', // Allows sending cookies with same-site requests and top-level cross-origin navigation
    secure: true, // Set to true if using HTTPS; for localhost, it should be false
    path: '/' // Path where the cookie is available
  });
  res.status(200).json("Principal+ "+ payload.user);
  
}

  }catch(error){
    console.error(error)
    res.status(404).json("student not found")
  }
}







// Function to generate a unique 4-digit teacherId
const generateUniqueTeacherId = async () => {
  let teacherId;
  const existingTeacherIds = await Teacher.find().distinct('teacherId');
  
  do {
    // Generate a random 4-digit number
    teacherId = Math.floor(1000 + Math.random() * 9000).toString();
  } while (existingTeacherIds.includes(teacherId)); // Ensure it's unique

  return teacherId;
};

export const createTeacher = async (req, res) => {
  try {
    const { teacherName, age, subject, salary, dateOfBirth, className } = req.body;

    // Generate a unique teacherId
    const teacherId = await generateUniqueTeacherId();

    const newTeacher = new Teacher({
      teacherName,
      age,
      subject,
      salary,
      dateOfBirth,
      teacherId,
      className
    });

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all teachers
export const getTeachers = async (req, res) => {
  try {
    
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a teacher by ID
export const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (req, res) => {
  const {id}  =req.params
  try {
    const deletedTeacher = await Teacher.findOneAndDelete({teacherId:id});
    if (!deletedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
