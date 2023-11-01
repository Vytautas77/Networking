import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const REGISTER_USER = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      skills: [],
      password: hash,
    });
    user.id = user._id;
    const response = await user.save();

    return res
      .status(200)
      .json({ status: "User registered", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const LOGIN = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "Bad authentication" });
  }
  bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
    if (!isPasswordMatch || err) {
      return res.status(404).json({ message: "Bad authentication" });
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      { algorithm: "RS256" }
    );
    return res.status(200).json({ token });
  });
};
export { REGISTER_USER, LOGIN };
