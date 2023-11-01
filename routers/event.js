import express from "express";
import {
  CREATE_EVENT,
  GET_EVENTS,
  //   GET_EVENTS_BY_ID,
  JOIN_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_EVENTS_BY_ID_USERS,
} from "../controllers/event.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/", CREATE_EVENT);
router.post("/:id/join", auth, JOIN_EVENT);
router.get("/", GET_EVENTS);
// router.get("/:id", GET_EVENTS_BY_ID);
router.get("/:id", GET_EVENTS_BY_ID_USERS);
router.delete("/:id", DELETE_EVENT);
router.put("/:id", UPDATE_EVENT);

export default router;
