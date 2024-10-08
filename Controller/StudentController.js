import Student from '../module/StudentSchema.js';
import jwt from "jsonwebtoken"
// Create a new student




const secretKey =process.env.SECRET_KEY;

export const studentLogin = async (req, res) => {
  try {
    const { rollNo, studentId } = req.body;
    console.log(req.body);

    // Find the student with the provided roll number and student ID
    const student = await Student.findOne({ rollNo, studentId });

    if (!student) {
      return res.status(210).json("Invalid Credentials");
    }

    console.log("Student found", student);

    // Generate JWT token
    const payload = { user: student.rollNo, role: "student" };
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

    // Send a successful response with status code 200
    res.status(202).json("student "+ payload.user);

  } catch (error) {
    console.error(error);
    res.status(500).json("Error during student login");
  }
};



// Function to generate a unique 6-digit ID
const generateUniqueId = async () => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random 6-digit number as a string
    uniqueId = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if this ID already exists in the database
    const existingStudent = await Student.findOne({ studentId: uniqueId });
    
    if (!existingStudent) {
      isUnique = true; // Exit loop if ID is unique
    }
  }

  return uniqueId;
};

export const createStudent = async (req, res) => {
  try {
    const { studentName, rollNo, age, studentClass } = req.body;

    // Generate a unique student ID
    const studentId = await generateUniqueId();

    const newStudent = new Student({
      studentName,
      rollNo,
      age,
      studentClass,
      studentId
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};


// Get all students
export const getStudents = async (req, res) => {
  try {

  
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const {id} =req.params
    const student = await Student.findOne({rollNo:id});
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getStudentByClassName = async (req, res) => {
  try {
    const {className} =req.params
    const students = await Student.find({studentClass:className});
  
    if (!students) return res.status(404).json({ message: 'Students not found' });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
  try {
    const { studentName, rollNo, age, studentClass,email,phone,address } = req.body;
const {id} = req.params
    const updatedStudent = await Student.findOneAndUpdate(
{  rollNo:id},
      { studentName, rollNo, age, studentClass,email,phone,address },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const {id} = req.params
    const deletedStudent = await Student.findOneAndDelete({rollNo:id});
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
