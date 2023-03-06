const mongoose = require("mongoose");

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_LOCAL_URI);
};

module.exports = dbConnect;
