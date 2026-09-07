import User from "../models/User.js";
// Imports the User model so we can find the authenticated user.

export const getCurrentUser = async (req, res) => {
  // This controller is only accessible to authenticated users.

  try {
    // req.user.userId was added by authMiddleware.js.
    const user = await User.findById(req.user.userId)
      .select("-password");
    // .select("-password") prevents the password hash
    // from being returned in the response.

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};