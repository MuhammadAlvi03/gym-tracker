import { Router } from "express";
import {
    getExercises,
    createExercise
} from "../controllers/exercises.controller.js";

const router = Router({mergeParams: true});

router.get("/", getExercises);
router.post("/", createExercise);

export default router;