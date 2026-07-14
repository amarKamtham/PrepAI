const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

       res.status(201).json({
    message: "User Registered Successfully",
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
});
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        // Compare Password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

       const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);

res.status(200).json({
    message: "Login Successful",
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
});

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile
};