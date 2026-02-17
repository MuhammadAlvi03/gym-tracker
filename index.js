// import express
const express = require("express");

// app represents the server
const app = express();

// enable JSON body parsing
app.use(express.json());

// mock DB
let workouts = [];
let nextWorkoutId = 1;
let exercises = [];
let nextExerciseId = 1;


// main page
app.get("/", (req, res) => {
    res.send("Hello from my gym server!!");
});


// get workouts
app.get("/workouts", (req, res) => {
    const { name } = req.query;
    if (name) {
        const filtered = workouts.filter(w => w.name === name);
        return res.json(filtered);
    }

    res.json(workouts);
});

// create new workout
app.post("/workouts", (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: "name is required" });
    }

    // create new workout
    const createdWorkout = { id: nextWorkoutId, name };
    nextWorkoutId++;

    workouts.push(createdWorkout);  // push to workouts array
    res.status(201).json(createdWorkout);   // set status to 201: creation successful
})

// update workout
app.patch("/workouts/:workoutId", (req, res) => {
    const workoutId = Number(req.params.workoutId);
    const workout = workouts.find(w => w.id === workoutId)
    if (!workout) {
        return res.status(404).json({error: "workout not found"});
    }

    const { name } = req.body;
    if (name === undefined) {
        res.status(400).json({error: "no fields provided to update"});
    }
    
    workout.name = name;
    res.status(200).json(workout);
    
})

// get workout and exercises by id
app.get("/workouts/:workoutId", (req, res) => {
    const workoutId = Number(req.params.workoutId);
    const workout = workouts.find(w => w.id === workoutId)
    if (!workout) {
        return res.status(404).json({error: "workout not found"});
    }

    const filteredExercises = exercises.filter(e => e.workoutId === workoutId)
    res.json({
        workout,
        exericses: filteredExercises
    });
})

// delete workout
app.delete("/workouts/:workoutId", (req, res) => {
    const workoutId = Number(req.params.workoutId);
    const workout = workouts.find(w => w.id === workoutId)
    if (!workout) {
        return res.status(404).json({error: "workout not found"});
    }

    workouts = workouts.filter(w => w.id !== workoutId)
    exercises = exercises.filter(e => e.workoutId !== workoutId);
    res.status(204).send();
})


// create new exercise
app.post("/workouts/:workoutId/exercises", (req, res) => {
    const workoutId = Number(req.params.workoutId);
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) {
        return res.status(404).json({error: `no workout with id: ${workoutId} found`});
    }

    const { name } = req.body;
    if (!name) {
        return res.status(400).json({error: "name is required"});
    }

    const createdExercise = { id: nextExerciseId, name, workoutId };
    nextExerciseId++;
    
    exercises.push(createdExercise);
    res.status(201).json(createdExercise);

});


// get exercises
app.get("/workouts/:workoutId/exercises", (req, res) => {
    const workoutId = Number(req.params.workoutId);
    const workout = workouts.find(w => w.id === workoutId);
    
    if (!workout) {
        return res.status(404).json({error: `no workout with id: ${workoutId} found`});
    }
    
    const filtered = exercises.filter(e => e.workoutId === workoutId);
    res.json(filtered);
})


// opens port 3000 and listens for requests
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

