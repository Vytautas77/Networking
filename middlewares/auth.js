import jwt from "jsonwebtoken";

const authenticationUser = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Bad auth" });
    }
    req.body.userId = decoded.userId;
    return next();
  });
};

export default authenticationUser;
