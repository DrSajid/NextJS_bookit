import Room from "../models/room";

// Get all rooms  => /api/rooms
const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      success: true,
      count: rooms.length,
      message: rooms,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single rooms  => /api/rooms/:id
const getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);
    if (!room) {
      throw new Error();
    }
    res.status(200).json({
      success: true,
      count: room,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Room not found with this ID",
    });
  }
};

// update single rooms  => /api/rooms/:id
const updateRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.query.id);
    if (!room) {
      throw new Error();
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update",
    });
  }
};

// delete single rooms  => /api/rooms/:id
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);
    if (!room) {
      throw new Error();
    }

    await Room.findByIdAndDelete(req.query.id);

    res.status(200).json({
      success: true,
      messaage: "room removed successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete room",
    });
  }
};

// Create new room  => /api/rooms
const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
