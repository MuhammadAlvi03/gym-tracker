import { isValidId, validateName } from "../utils/validation.js";
import {
    findByWorkoutId,
    create,
    updateName,
    deleteExerciseById,
} from "../data/exercises.data.js"
import * as setsData from "../data/sets.data.js";


// GET /workouts/:workoutId/exercises
// Returns exercises matching workoutId
export const getExercises = (req, res) => {
    const workoutId = Number(req.params.workoutId);
    
    if (!isValidId(workoutId))
        return res.status(400).json({error: "Invalid workoutId"});

    res.status(200).json(findByWorkoutId(workoutId));
}


// POST /workouts/:workoutId/exercises
// Required JSON body: { name: string }
// Returns created exercise object
export const createExercise = (req, res) => {
    const workoutId =  Number(req.params.workoutId);
    if (!isValidId(workoutId))
        return res.status(400).json({error: "Invalid workoutId"});

    const name = validateName(req.body.name);

    if (!name.valid)
        return res.status(400).json({error: name.error});

    const exercise = create(workoutId, name.value);

    if (!exercise)
        return res.status(400).json({error: "Unable to create exercise"});
    
    res.status(201).json(exercise);
}


// PATCH /workouts/:workoutId/exercises/:exerciseId
// Required JSON body: { name: string }
// Returns updated exercise object
export const updateExerciseName = (req, res) => {
    const exerciseId = Number(req.params.exerciseId);
    if (!isValidId(exerciseId))
        return res.status(400).json({error: "Invalid exerciseId"});

    const name = validateName(req.body.name);

    if (!name.valid)
        return res.status(400).json({error: name.error});

    const updated = updateName(exerciseId, name);
    
    if (!updated)
        return res.json({error: "No exercise found"});
    
    res.status(200).json(updated);
}


// DELETE /workouts/:workoutId/exercises/:exerciseId
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


// POST /workouts/:workoutId/exercises/:exerciseId/sets
// Required JSON body: { weight: number, reps: integer}
// Returns created set object
export const addSet = (req, res) => {
    const exerciseId = Number(req.params.exerciseId);
    if (!isValidId(exerciseId))
        return res.status(400).json({error: "Invalid exerciseId"});

    const { weight, reps } = req.body;
    
    if (typeof(weight) !== "number" || weight < 0)
        return res.status(400).json({error: "Invalid weight"});
    if (typeof(reps) !== "number" || reps < 0)
        return res.status(400).json({error: "Invalid rep count"});

    const createdSet = setsData.createSet(exerciseId, weight, reps);
    
    if (!createdSet)
        return res.status(400).json({error: "Unable to create set"});
    
    res.status(201).json(createdSet);
}


// GET /workouts/:workoutId/exercises/:exerciseId/sets
// Returns sets matching exerciseId
export const getSets = (req, res) => {
    const exerciseId = Number(req.params.exerciseId);

    if (!isValidId(exerciseId))
        return res.status(400).json({error: "Invalid exerciseId"});

    const exerciseSets = setsData.findAllByExerciseId(exerciseId);
    
    res.status(200).json(exerciseSets)
}


// DELETE /workouts/:workoutId/exercises/:exerciseId/sets/:setId
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