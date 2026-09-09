import { Router } from "express";
import {
    getExercises,
    createExercise,
    updateExerciseName,
    deleteExercise,
    addSet,
    getSets,
    deleteSet
} from "../controllers/exercises.controller.js";

const router = Router({mergeParams: true});

router.get("/", getExercises);
router.post("/", createExercise);
router.patch("/:exerciseId", updateExerciseName);
router.delete("/:exerciseId", deleteExercise);
router.get("/:exerciseId/sets", getSets);
router.post("/:exerciseId/sets", addSet);
router.post("/:exerciseId/sets", deleteSet);

export default router;