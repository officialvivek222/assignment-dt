const express = require("express");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;

const config = require("./config/config");
const database = require("./utils/database");

const app = express();
const port = config.port;

database.connect();

app.use(bodyParser.json());

app.get("/api/v3/app/events", async (req, res) => {
  const eventId = req.query.id;
  if (!eventId) {
    return res.status(400).send({ message: "Missing event ID" });
  }

  try {
    const event = await database.findOne("user", {
      _id: new ObjectId(eventId),
    });
    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/api/v3/app/events", async (req, res) => {
  const { type, limit, page } = req.query;

  if (type !== "latest") {
    return res.status(400).send({ message: "Invalid type parameter" });
  }

  const skip = (page - 1) * limit || 0;

  try {
    const events = await database.find(
      "user",
      {},
      { sort: { schedule: -1 }, limit, skip },
    );
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/api/v3/app/events", async (req, res) => {
  const eventData = req.body;

  try {
    const eventId = await database.insertOne("user", eventData);
    res.status(201).json({ eventId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.put("/api/v3/app/events/:id", async (req, res) => {
  const eventId = req.params.id;
  const updateData = req.body;

  try {
    await database.updateOne(
      "user",
      { _id: new ObjectId(eventId) },
      { $set: updateData },
    );
    res.json({ message: "Event updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.delete("/api/v3/app/events/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    await database.deleteOne("user", { _id: new ObjectId(eventId) });
    res.json({ message: "Event deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
