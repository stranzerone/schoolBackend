import Teacher from '../module/TeacherSchema.js';
import jwt from "jsonwebtoken"

// Create a new teacher

const secretKey =process.env.SECRET_KEY;

export const teacherLogin =async(req,res)=>{


  try{

const {teacherId,dateOfBirth} = req.body
console.log(req.body)

const teacher = await Teacher.findOne({teacherId:teacherId,dateOfBirth:dateOfBirth})

if(teacher){
  console.log("teacher found found",teacher)

  const payload = { user: teacherId, role: "teacher" };
  const options = { expiresIn: "2h" };
  const token = jwt.sign(payload, secretKey, options);

  // Set the token in a cookie
  res.cookie('token', token, {
    maxAge: 9000000, // Cookie expiration time in milliseconds
    httpOnly: true,
    sameSite: 'None',
    secure: true, // Set to true if using HTTPS
    path: '/' // Path where the cookie is available
  });
  res.status(201).json("teacher  success")
}


  }catch(error){
    console.error(error)
    res.status(404).json("student not found")
  }
}






export const principalLogin =async(req,res)=>{


  try{

const {username,password} = req.body
console.log(req.body)


if(username=="principal@classroom.com" && password=="Admin"){
  console.log("teacher found found")


  const payload = { user: username, role: "principal" };
  const options = { expiresIn: "2h" };
  const token = jwt.sign(payload, secretKey, options);

  // Set the token in a cookie
  res.cookie('token', token, {
    maxAge: 9000000, // Cookie expiration time in milliseconds
    httpOnly: true, // Cookie cannot be accessed via JavaScript
    sameSite: 'Lax', // Ensures cookies are sent with cross-origin requests
    secure: false, // Set to true if using HTTPS
    path: '/' // Path where the cookie is available
  });
  res.status(200).json("principal access foin success")
}


  }catch(error){
    console.error(error)
    res.status(404).json("student not found")
  }
}






export const createTeacher = async (req, res) => {
  try {
    const { teacherName, age, subject, salary, dateOfBirth,teacherId,className } = req.body;

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
    console.log(error)
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
