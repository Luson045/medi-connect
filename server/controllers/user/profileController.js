const User = require("../../models/user.js");
const Hospital = require("../../models/hospital.js");

const getProfile = async (req, res) => {
  try {
    let profile = await User.findById(req.user.id);
    if (!profile) {
      profile = await Hospital.findById(req.user.id);
      if (!profile) return res.status(404).json({ msg: "Profile not found" });
      return res.json({ ...profile.toObject(), role: "hospital" });
    }
    res.json({ ...profile.toObject(), role: "user" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

const editProfile = async (req, res) => {
  try {
    const { id } = req.user; // Get 'id' from token
    let updateData = req.body; // Data to update, parsed from request body

    // Check if the user exists
    let user = await User.findById(id);
    if (user) {
      // If user exists, validate the data using userSchema
      updateData = userSchema.partial().parse(updateData);

      const updatedUser = await User.findByIdAndUpdate(
        id, // User ID from token
        { $set: updateData }, // Update only the provided fields
        { new: true, runValidators: true } // Return the updated document
      );

      return res.json(updatedUser); // Return the updated user data
    }

    // Check if the hospital exists (if user wasn't found)
    let hospital = await Hospital.findById(id);
    if (hospital) {
      // If hospital exists, validate the data using hospitalSchema
      updateData = hospitalSchema.partial().parse(updateData);

      const updatedHospital = await Hospital.findByIdAndUpdate(
        id, // Hospital ID from token
        { $set: updateData }, // Update only the provided fields
        { new: true, runValidators: true } // Return the updated document
      );

      return res.json(updatedHospital); // Return the updated hospital data
    }

    // If neither a user nor a hospital was found, return an error
    return res
      .status(404)
      .json({ msg: "No user or hospital found with the provided ID" });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = { getProfile ,editProfile};
