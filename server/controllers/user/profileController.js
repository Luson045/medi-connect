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

module.exports = { getProfile };
