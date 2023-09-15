const mongoose = require("mongoose");
const { Doctor } = require("../models/DoctorSchema");
const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      //required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});
reviewSchema.statics.calcAverageRating = async function (doctorId) {
  const stats = await this.aggregate([
    { $match: { doctor: doctorId } },

    {
      $group: {
        _id: "$doctor",
        numberOfrating: { $sum: 1 },
        avaRating: { $avg: "$rating" },
      },
    },
  ]);

  console.log(stats);
  reviewSchema.post("save", function () {
    this.constructor.calcAverageRating(this.doctor);
  });

  await Doctor.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].numberOfrating,
    averageRating: stats[0].avaRating,
  });
};
const Review = mongoose.model("Review", reviewSchema);
module.exports = {
  Review,
};
// const Doctor = mongoose.model("Doctor", DoctorSchema);
// //export default mongoose.model("Doctor", DoctorSchema);
// module.exports = {
//   Doctor,
// };
