const express = require("express");
const { authenticate, restrict } = require("../Auth/verfiyToken");
const {
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getallDoctor,
} = require("../Controllers/doctor.js");
const review = require("./rev");
const router = express.Router(); //review
router.use("/:id/review", review);
router.get("/:id", getDoctor);
router.put("/:id", authenticate, restrict(["admin", "doctor"]), updateDoctor);
router.delete(
  "/:id",
  authenticate,
  restrict(["admin", "doctor"]),
  deleteDoctor
);
router.get("/", getallDoctor);
module.exports = router;
