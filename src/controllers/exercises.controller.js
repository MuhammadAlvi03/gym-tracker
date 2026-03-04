import {
    findByWorkoutId,
    create,
    updateName
} from "../data/exercises.data.js"
import { isValidId } from "../utils/validation.js";

export const getExercises = (req, res) => {
    const workoutId = Number(req.params.workoutId);
    if (!isValidId(workoutId)) {
        return res.status(400).json({error: "Invalid workoutId"});
    }

    res.status(200).json(findByWorkoutId(workoutId));
}

export const createExercise = (req, res) => {
    const workoutId =  Number(req.params.workoutId);
    if (!isValidId(workoutId)) {
        return res.status(400).json({error: "Invalid workoutId"});
    }

    let { name } = req.body;

    // ----------- can be extracted into validation function
    if (name === undefined) {
        return res.status(400).json({error: "No fields provided to update"});
    }

    if (typeof(name) !== "string" || !name.trim()) {
        return res.status(400).json({error: "Invalid name"});
    }
    // -----------
    
    name = name.trim();
    const exercise = create(workoutId, name);
    if (!exercise) {
        return res.status(400).json({error: "Unable to create workout"});
    }
    
    res.status(201).json(exercise);
}


export const updateExerciseName = (req, res) => {
    const exerciseId = Number(req.params.exerciseId);
    if (!isValidId(exerciseId)) {
        return res.status(400).json({error: "Invalid exerciseId"});
    }

    let { name } = req.body;
    if (name === undefined) {
        return res.status(400).json({error: "No fields provided to update"});
    }
    
    if (typeof(name) !== "string" || !name.trim()) {
        return res.status(400).json({error: "Invalid name"});
    }

    name = name.trim();
    const updated = updateName(exerciseId, name);
    
    if (!updated) {
        return res.json({error: "No workout found"});
    }
    
    res.status(200).json(updated);
}