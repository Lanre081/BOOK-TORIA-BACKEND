import httpstatus from "http-status";
import User from "../../models/user.js";

// controller for user registration
export const register = async (req, res) => {
  try {
    // 1. Get user input
    const { username, email, password, role } = req.body;

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(httpstatus.CONFLICT).json({
        statuscode: httpstatus.CONFLICT,
        success: false,
        message: "User already exists with this email",
      });
    }

    // 3. Create new user
    const user = await User.create({
      username,
      email,
      password,
      role,
    });

    // 4. Send response
    return res.status(httpstatus.CREATED).json({
      statuscode: httpstatus.CREATED,
      success: true,
      message: "User created successfully",
      data: {
        id: user._id,
        profilePicture: user.profilePicture,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
      statuscode: httpstatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};