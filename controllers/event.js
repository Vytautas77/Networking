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
export { CREATE_EVENT, JOIN_EVENT };
