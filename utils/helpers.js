import jwt from "jsonwebtoken";

// Helper functions
export const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "2s" });
};

export const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "30d" });
};
