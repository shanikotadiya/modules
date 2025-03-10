import jwt from "jsonwebtoken";

export const genertaeToken = (user) => {
  const payload = {
    id: user._id,
  };
  const secrateKey = process.env.JWT_SECRET;
  return jwt.sign(payload, secrateKey, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
