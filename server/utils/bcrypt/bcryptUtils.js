const bcrypt = require("bcryptjs");

// Function to hash the password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error generating password hash");
  }
};

// Function to compare a plain-text password with a hashed password
const comparePassword = async (enteredPassword, storedHashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Error comparing passwords");
  }
};

module.exports = { hashPassword, comparePassword };
