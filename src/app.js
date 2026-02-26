import express from "express";
import workoutsRoutes from "./routes/workouts.routes.js";

// app represents the server
const app = express();

// enable JSON body parsing
app.use(express.json());

app.use("/workouts", workoutsRoutes);

export default app;