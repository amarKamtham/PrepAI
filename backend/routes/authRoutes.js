const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    updateUserProfile
} = require("../controllers/authController");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Update Profile
router.put("/profile", protect, updateUserProfile);

module.exports = router;