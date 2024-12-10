import User from "../models/users.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
      expiresIn: "6h",
    });
  };
  const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
      expiresIn: "7d",
    });
  };


  
  // Register User
  const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Validate input
      if (!username) return res.status(400).json({ message: "Username required" });
      if (!email) return res.status(400).json({ message: "Email required" });
      if (!password) return res.status(400).json({ message: "Password required" });
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(401).json({ message: "User already exists" });
  
      // Create new user
      const createUser = await User.create({ username, email, password });
  
      res.status(201).json({
        message: "User registered successfully",
        data: createUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // Login User
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email) return res.status(400).json({ message: "Email is required" });
      if (!password) return res.status(400).json({ message: "Password is required" });
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Compare password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(400).json({ message: "Incorrect password" });
  
      // Generate tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
  
      // Set refresh token in cookies
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // Change to true if using HTTPS
      });
  
      res.status(200).json({
        message: "User logged in successfully",
        accessToken,
        refreshToken,
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // Logout User
  const logoutUser = (req, res) => {
    try {
      // Clear the refresh token cookie
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export { registerUser, loginUser, logoutUser };