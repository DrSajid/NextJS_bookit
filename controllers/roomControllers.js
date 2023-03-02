import Room from "../models/rooms";
// import Test from "../models/testModel";

const allRooms = (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "All Rooms",
  });
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

export { allRooms, newRoom };
