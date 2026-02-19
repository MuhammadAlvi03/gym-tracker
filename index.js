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
let sets = [];
let nextSetId = 1;

// main page
app.get("/", (req, res) => {
    res.send("Hello from my gym server!!");
});


// get workouts
app.get("/workouts", (req, res) => {
    res.json(workouts);
});

// create new workout
app.post("/workouts", (req, res) => {
    let { name } = req.body;
    
    if (typeof(name) !== "string") {
        return res.status(400).json({ error: "Invalid name"});
    }

    name = name.trim();
    
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
        return res.status(404).json({error: "Workout not found"});
    }

    let { name } = req.body;
    if (name === undefined) {
        return res.status(400).json({error: "No fields provided to update"});
    }

    if (typeof(name) !== "string" || name === "") {
        return res.status(400).json({error: "Invalid name"});
    }

    name = name.trim();
    
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
        exercises: filteredExercises
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


// get exercises for a specific workout
app.get("/workouts/:workoutId/exercises", (req, res) => {
    const workoutId = Number(req.params.workoutId);
    const workout = workouts.find(w => w.id === workoutId);
    
    if (!workout) {
        return res.status(404).json({ error: `no workout with id: ${workoutId} found`});
    }
    
    const filtered = exercises.filter(e => e.workoutId === workoutId);
    res.json(filtered);
})


// get exercise by ID
app.get("/exercises/:exerciseId", (req, res) => {

    const exerciseId = Number(req.params.exerciseId);
    const exercise = exercises.find(e => e.id === exerciseId);

    if (!exercise) {
        return res.status(404).json({ error: `No exercise with id: ${exerciseId} found`});
    }
    const exerciseSets = sets.filter(s => s.exerciseId === exerciseId).sort((a, b) => a.setNumber - b.setNumber);

    res.status(200).json({exercise, sets: exerciseSets});
})


// add set
app.post("/exercises/:exerciseId/sets", (req, res) => {
    const exerciseId = Number(req.params.exerciseId);
    let { setNumber, weight, reps } = req.body;


    setNumber = Number(setNumber);
    weight = Number(weight);
    reps = Number(reps);

    const exercise = exercises.find(e => e.id === exerciseId);

    if (!exercise) {
        return res.status(404).json({ error: "No exercise found"});
    }

    if (!Number.isInteger(setNumber) || setNumber < 1) {
        return res.status(400).json({error: "Invalid set number"});
    }

    if (!Number.isFinite(weight) || weight < 0) {
        return res.status(400).json({error: "Invalid weight"});
    }

    if (!Number.isInteger(reps) || reps < 1) {
        return res.status(400).json({ error: "Invalid rep count"});
    }

    const collision = sets.some(s => s.exerciseId === exerciseId && s.setNumber === setNumber);
    if (collision) {
        return res.status(409).json({error: `Set number ${setNumber} already exists for this exercise`})
    }

    const createdSet = { id: nextSetId, setNumber, weight, reps, exerciseId};
    nextSetId++;
    sets.push(createdSet);

    res.status(201).json(createdSet);
})


// get sets for a specific exercise
app.get("/exercises/:exerciseId/sets", (req, res) => {
    const exerciseId = Number(req.params.exerciseId);
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) {
        return res.status(404).json({error: "Exercise not found"});
    }

    const filtered = sets.filter(s => s.exerciseId === exerciseId).sort((a, b) => a.setNumber - b.setNumber);
    if (filtered.length === 0) {
        return res.status(200).json([]);
    }

    res.status(200).json(filtered);
})


// opens port 3000 and listens for requests
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

