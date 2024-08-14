import ClassRoom from '../module/ClassRoomSchema.js';

// Create a new classroom
export const createClassRoom = async (req, res) => {
  try {
    const { className, totalSeats, seatAvailable, seatOccupied, classTeacher, timeTableId, startTime, endTime } = req.body;
console.log(req.body)
    const newClassRoom = new ClassRoom({
      className,
      totalSeats,
      seatAvailable,
      seatOccupied,
      classTeacher,
      timeTableId,
      startTime,
      endTime
    });

    await newClassRoom.save();
    res.status(201).json(newClassRoom);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Get all classrooms
export const getClassRooms = async (req, res) => {
  try {
    const classRooms = await ClassRoom.find();
    res.status(200).json(classRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single classroom by ID
export const getClassRoomById = async (req, res) => {
  try {
    const {id} = req.params
    const classRoom = await ClassRoom.findOne({className:id});
    if (!classRoom) return res.status(404).json({ message: 'ClassRoom not found' });
    res.status(200).json(classRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a classroom by ID
export const updateClassRoom = async (req, res) => {
  try {
    const updatedClassRoom = await ClassRoom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClassRoom) return res.status(404).json({ message: 'ClassRoom not found' });
    res.status(200).json(updatedClassRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a classroom by ID
export const deleteClassRoom = async (req, res) => {
  try {
    const deletedClassRoom = await ClassRoom.findByIdAndDelete(req.params.id);
    if (!deletedClassRoom) return res.status(404).json({ message: 'ClassRoom not found' });
    res.status(200).json({ message: 'ClassRoom deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
