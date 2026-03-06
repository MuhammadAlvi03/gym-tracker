import {
    findAll,
    findById,
    create, 
    updateName,
    deleteById
} from "../data/workouts.data.js";


// GET /workouts
// Returns all workout objects
export const getWorkouts = (req, res) => {
    res.status(200).json(findAll());
};


// POST /workouts
// Required JSON body: { name: string }
// Returns created workout object
export const createWorkout = (req, res) => {
    let { name } = req.body;
    
    if (typeof(name) !== "string")
        return res.status(400).json({ error: "Invalid name"});

    name = name.trim();
    
    if (!name)
        return res.status(400).json({ error: "name is required" });

    const createdWorkout = create(name);

    res.status(201).json(createdWorkout);   // set status to 201: creation successful
}


// PATCH /workouts/:workoutId
// Required JSON body: { name: string }
// Returns updated workout object
export const updateWorkout = (req, res) => {
    const workoutId = Number(req.params.workoutId);

    if (!Number.isInteger(workoutId) || workoutId < 1)
        return res.status(400).json({error: "Invalid workoutId"});

    let { name } = req.body;

    if (name === undefined)
        return res.status(400).json({error: "No fields provided to update"});

    if (typeof(name) !== "string" || !name.trim())
        return res.status(400).json({error: "Invalid name"});

    name = name.trim();
    const updated = updateName(workoutId, name);

    if (!updated)
        return res.status(404).json({error: "Workout not found"});

    res.status(200).json(updated);
}


// GET /workouts/:workoutId
// Returns workout matching workoutId
export const getWorkoutById = (req, res) => {
    const workoutId = Number(req.params.workoutId);
    if (!Number.isInteger(workoutId) || workoutId < 1) {
        return res.status(400).json({error: "Invalid workoutId"});
    }

    const workout = findById(workoutId);
    if (!workout) {
        return res.status(404).json({error: "No workout found"});
    }

    res.status(200).json(workout);
}


// DELETE /workouts/:workoutId
export const deleteWorkout = (req, res) => {
    const workoutId = Number(req.params.workoutId);
    if (!Number.isInteger(workoutId) || workoutId < 1)
        return res.status(400).json({error: "Invalid workoutId"});
    

    if (!deleteById(workoutId))
        return res.status(404).json({error: "No workout found"});

    res.status(204);
}