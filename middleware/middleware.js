import jwt from "jsonwebtoken";

const Middleware = (req, res, next) => {
  const authHeader = req.header("authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    console.log("decoded: ", decoded);

    req.user = decoded; // Store user information from the token in req.user to avoid reauthenticating a user, each time, they access protected routes
    next(); // proceed to the next route handler
  } catch (error) {
    res.status(401).json({ error: "Token is not valid", error });
  }
};

export default Middleware;
