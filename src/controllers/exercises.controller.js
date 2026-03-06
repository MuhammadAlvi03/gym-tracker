import { isValidId } from "../utils/validation.js";
import {
    findByWorkoutId,
    create,
    updateName,
    deleteExerciseById,
} from "../data/exercises.data.js"
import * as setsData from "../data/sets.data.js";

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
        return res.status(400).json({error: "Unable to create exercise"});
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
        return res.json({error: "No exercise found"});
    }
    
    res.status(200).json(updated);
}


export const deleteExercise = (req, res) => {
    const exerciseId = Number(req.params.exerciseId);
    if (!isValidId(exerciseId)) {
        return res.status(400).json({error: "Invalid exerciseId"});
    }

    const deleted = deleteExerciseById(exerciseId);
    if (!deleted) {
        return res.status(404).json({error: "No exercise found"});
    }
    
    res.status(204);

}


export const addSet = (req, res) => {
    const exerciseId = Number(req.params.exerciseId);
    if (!isValidId(exerciseId)) {
        return res.status(400).json({error: "Invalid exerciseId"});
    }

    const { weight, reps } = req.body;
    
    if (typeof(weight) !== "number" || weight < 0)
        return res.status(400).json({error: "Invalid weight"});
    if (typeof(reps) !== "number" || reps < 0)
        return res.status(400).json({error: "Invalid rep count"});

    const createdSet = setsData.createSet(exerciseId, weight, reps);
    
    if (!createdSet) {
        return res.status(400).json({error: "Unable to create set"});
    }
    
    res.status(201).json(createdSet);

}


export const getSets = (req, res) => {
    const exerciseId = Number(req.params.exerciseId);
    if (!isValidId(exerciseId)) {
        return res.status(400).json({error: "Invalid exerciseId"});
    }

    const exerciseSets = setsData.findAllByExerciseId(exerciseId);
    res.status(200).json(exerciseSets)
}

export const deleteSet = (req, res) => {
    const setId = Number(req.params.setId);
    if (!isValidId(setId)) {
        return res.status(400).json({error: "Invalid setId"});
    }

    const deleted = setsData.deleteSetById(setId);
    if (!deleted) {
        return res.status(404).json({error: "No set found"});
    }
    
    res.status(204);
}