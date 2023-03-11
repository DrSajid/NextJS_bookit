import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncErrors";

// Get all rooms  => /api/rooms
const allRooms = catchAsyncError(async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json({
    success: true,
    count: rooms.length,
    message: rooms,
  });
});

// Get Single rooms  => /api/rooms/:id
const getSingleRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    throw new Error();
  }
  res.status(200).json({
    success: true,
    count: room,
  });
});

// update single rooms  => /api/rooms/:id
const updateRoom = catchAsyncError(async (req, res, next) => {
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
});

// delete single rooms  => /api/rooms/:id
const deleteRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    throw new Error();
  }

  await Room.findByIdAndDelete(req.query.id);

  res.status(200).json({
    success: true,
    messaage: "room removed successfully",
  });
});

// Create new room  => /api/rooms
const newRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.create(req.body);
  res.status(200).json({
    success: true,
    room,
  });
});

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
