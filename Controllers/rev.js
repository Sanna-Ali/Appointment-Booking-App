const { Doctor } = require("../models/DoctorSchema");
const { Review } = require("../models/ReviewSchema");
module.exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ success: true, message: "successful", data: reviews });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
module.exports.createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.id;
  if (!req.body.user) req.body.user = req.userId;
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._doc },
    });
    console.log(savedReview._doc);
    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
