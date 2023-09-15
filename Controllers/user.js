const { User } = require("../models/UserSchema");

module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "successfuly update", data: updateUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};
module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUser = await User.findByIdAndUpdate(id);
    res.status(200).json({ success: true, message: "successfuly delete" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

module.exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({ success: true, message: "user found", data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: "user not found " });
  }
};
module.exports.getallUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ success: true, message: "user found", data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: "user not found " });
  }
};
