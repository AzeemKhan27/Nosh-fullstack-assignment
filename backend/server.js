
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/nosh-assignment";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Mongoose schema and model
const dishSchema = new mongoose.Schema({
  dishId: { type: String, unique: true },
  dishName: String,
  imageUrl: String,
  isPublished: Boolean,
});

const Dish = mongoose.model("Dish", dishSchema);


app.post("/api/dishes/bulk-insert", async (req, res) => {
  try {
    const dishes = req.body;
    const inserted = await Dish.insertMany(dishes);
    console.log("Inserted dishes:", inserted);
    res.status(201).json({ message: "Inserted", data: inserted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

Dish.find().then(dishes => {
  if (dishes.length === 0) {
    Dish.insertMany(seedData);
  }
});

// API routes
app.get("/api/dishes", async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

app.patch("/api/dishes/:dishId/toggle", async (req, res) => {
  const dish = await Dish.findOne({ dishId: req.params.dishId });
  if (!dish) return res.status(404).json({ error: "Dish not found" });
  dish.isPublished = !dish.isPublished;
  await dish.save();
  io.emit("dishUpdated", dish); // Real-time update
  res.json(dish);
});

// WebSocket setup
io.on("connection", (socket) => {
  console.log("Client connected");
});

// Start server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));