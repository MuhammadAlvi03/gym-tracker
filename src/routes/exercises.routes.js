import { Router } from "express";
import {
    getExercises,
    createExercise,
    updateExerciseName
} from "../controllers/exercises.controller.js";

const router = Router({mergeParams: true});

router.get("/", getExercises);
router.post("/", createExercise);
router.post("/", updateExerciseName);

export default router;