const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    const host = connect.connection.host;
    const name = connect.connection.name;
    console.log("Database connected ", host, name);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
