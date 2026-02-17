// import express
const express = require("express");

// app represents the server
const app = express();

// enable JSON body parsing
app.use(express.json());

// mock DB
const workouts = [];
let nextId = 1;

// routes
app.get("/", (req, res) => {
    res.send("Hello from my gym server!!");
});


app.get("/workouts", (req, res) => {
    res.json(workouts);
});


// create new workout
app.post("/workouts", (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: "name is required" });
    }

    // create new workout
    const createdWorkout = { id: nextId, name };
    nextId++;

    workouts.push(createdWorkout);  // push to workouts array
    res.status(201).json(createdWorkout);   // set status to 201: creation successful
})

// opens port 3000 and listens for requests
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

