const mongoose = require("mongoose");

async function connectDB(uri) {
  // Check if URI is provided
  if (!uri) {
    console.error("Error: MongoDB URI not provided.");
    return "MongoDB URI not provided";
  }

  // Simple URI validation
  const isValidUri =
    uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://");
  if (!isValidUri) {
    console.error("Error: Invalid MongoDB URI.");
    return "Invalid MongoDB URI";
  }

  try {
    // Connect to MongoDB with Mongoose
    await mongoose.connect(uri);

    console.log("Connected to Database Successfully");
    return "Connected successfully";
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    return `Connection failed: ${error.message}`;
  }
}

module.exports = connectDB;
