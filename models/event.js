import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  visitors: { type: Array, required: true },
});
export default mongoose.model("Event", eventSchema);
