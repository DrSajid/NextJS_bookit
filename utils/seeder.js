const rooms = require("../data/rooms");
const Room = require("../models/rooms");
const mongoose = require("mongoose");

// dbConnect();

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/bookit");

const seedRoom = async () => {
  try {
    await Room.deleteMany();
    console.log("Room are deleted");
    await Room.insertMany(rooms);
    console.log("New rooms are inserted");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRoom();
