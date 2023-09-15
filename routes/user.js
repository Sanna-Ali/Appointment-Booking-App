const express = require("express");
const { authenticate, restrict } = require("../Auth/verfiyToken");
const {
  getallUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../Controllers/user.js");
const router = express.Router();
router.get("/:id", authenticate, restrict(["admin", "patient"]), getUser);
router.put("/:id", authenticate, restrict(["admin", "patient"]), updateUser);
router.delete("/:id", authenticate, restrict(["admin", "patient"]), deleteUser);
router.get("/", authenticate, restrict(["admin", "patient"]), getallUser);
module.exports = router;
