import express from "express";
import { REGISTER_USER, LOGIN } from "../controllers/user.js";
const router = express.Router();

router.post("/register", REGISTER_USER);
router.post("/login", LOGIN);

export default router;
