import { Router } from "express";
import {
    getExercises,
    createExercise,
    updateExerciseName,
    deleteExercise
} from "../controllers/exercises.controller.js";

const router = Router({mergeParams: true});

router.get("/", getExercises);
router.post("/", createExercise);
router.patch("/:exerciseId", updateExerciseName);
router.delete("/:exerciseId", deleteExercise);

export default router;