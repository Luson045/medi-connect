const User = require("../models/user"); 
const base64 = require("base-64");

const adminMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Check if the Authorization header is provided and formatted as Basic Auth
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "No authorization header provided" });
  }

  // Decode credentials from Basic Auth
  const base64Credentials = authHeader.split(" ")[1];
  const decodedCredentials = base64.decode(base64Credentials);
  const [email] = decodedCredentials.split(":"); // Only extract the email

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the isAdmin value for debugging
    console.log(`User isAdmin value: ${user.isAdmin}`);

    // Check if the user is an admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Attach user info to the request object and proceed
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in admin middleware:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { adminMiddleware };
