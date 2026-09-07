import jwt from "jsonwebtoken";
// jsonwebtoken allows us to verify the JWT sent by the client.

export const protect = (req, res, next) => {
  // This middleware protects routes that require authentication.

  try {
    // Get the Authorization header from the request.
    const authHeader = req.headers.authorization;

    // Check whether the Authorization header exists
    // and follows the "Bearer TOKEN" format.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Remove "Bearer " and keep only the actual JWT.
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret stored in .env.
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store the user's ID on the request object.
    // Controllers can use req.user.userId later.
    req.user = {
      userId: decoded.userId,
    };

    // Token is valid, so continue to the next middleware/controller.
    next();
  } catch (error) {
    // jwt.verify() throws an error when the token is invalid
    // or expired.

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};