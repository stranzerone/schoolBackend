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
      return res.status(404).json("Student not found");
    }

    console.log("Student found", student);

    // Generate JWT token
    const payload = { user: student.rollNo, role: "student" };
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

    // Send a successful response with status code 200
    res.status(202).json({ message: "Login successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json("Error during student login");
  }
};


export const createStudent = async (req, res) => {
  try {
    const { studentName, rollNo, age, studentClass,studentId } = req.body;

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
    console.log(error)
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
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
  try {
    const { studentName, rollNo, age, studentClass } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { studentName, rollNo, age, studentClass },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(updatedStudent);
  } catch (error) {
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
