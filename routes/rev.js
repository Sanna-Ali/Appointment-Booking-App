const express = require("express");
const { getAllReviews, createReview } = require("../Controllers/rev");
const { authenticate, restrict } = require("../Auth/verfiyToken");
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"]), createReview);
module.exports = router;
