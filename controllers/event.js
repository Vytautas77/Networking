import EventModel from "../models/event.js";

const CREATE_EVENT = async (req, res) => {
  try {
    const event = new EventModel({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      visitors: req.body.visitors,
    });
    const response = await event.save();

    return res.status(201).json({ status: "Event created", response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const GET_EVENTS = async (req, res) => {
  try {
    const response = await EventModel.find();
    return res.send({ events: response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_EVENTS_BY_ID = async (req, res) => {
  try {
    const response = await EventModel.findById(req.params.id);
    return res.json({ Event: response });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const JOIN_EVENT = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event does not exist" });
    }

    EventModel.updateOne(
      { _id: event._id },
      { $push: { visitors: req.body.userId } }
    ).exec();
    console.log(req.body.userId);

    res.status(200).json({ message: "Event was join" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const UPDATE_EVENT = async (req, res) => {
  try {
    const eventResponse = await EventModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    return res
      .status(200)
      .json({ status: "Event was updated", response: eventResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const DELETE_EVENT = async (req, res) => {
  try {
    const eventResponse = await EventModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ response: eventResponse, status: "Event was delete" });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};
export {
  CREATE_EVENT,
  GET_EVENTS,
  GET_EVENTS_BY_ID,
  JOIN_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
};
