const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "This is your profile",
    user: req.user,
  });
});

router.get("/admin/dashboard", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome admin, this is the dashboard",
  });
});

module.exports = router;