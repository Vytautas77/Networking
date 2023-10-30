import express from "express";
import { CREATE_EVENT, JOIN_EVENT } from "../controllers/event.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/", CREATE_EVENT);
router.post("/:id/join", auth, JOIN_EVENT);

export default router;
