import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import dotenv from "dotenv" ; 
dotenv.config() ; 

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log("✅ MongoDB Atlas Connected");
})
.catch((err) => {
console.log(err);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

// Default Route
app.get("/", (req, res) => {
res.send("NeighbourFood Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});