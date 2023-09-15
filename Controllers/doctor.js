const { Doctor } = require("../models/DoctorSchema");
module.exports.updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "successfuly update",
      data: updateDoctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};
module.exports.deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletetDoctor = await Doctor.findByIdAndUpdate(id);
    res.status(200).json({ success: true, message: "successfuly delete" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

module.exports.getDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const Doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res.status(200).json({ success: true, message: "user found", data: Docto });
  } catch (error) {
    res.status(404).json({ success: false, message: "user not found " });
  }
};
module.exports.getallDoctor = async (req, res) => {
  const { query } = req.query;
  let Doctors;

  try {
    if (query) {
      Doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      //doctors = await Doctor.find({ isApproved: "approved" }).select( "-password"
      //);
      Doctors = await Doctor.find({}).select("-password");
    }
    //const Doctors = await Doctor.find({}).select("-password");
    res
      .status(200)
      .json({ success: true, message: "user found", data: Doctors });
  } catch (error) {
    res.status(404).json({ success: false, message: "user not found " });
  }
};
