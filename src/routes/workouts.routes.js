import { Router } from "express";
import exercisesRouter from "./exercises.routes.js";
import { 
    getWorkouts,
    createWorkout,
    updateWorkout,
    getWorkoutById,
    deleteWorkout
} from "../controllers/workouts.controller.js";

const router = Router();

router.get("/", getWorkouts);
router.get("/:workoutId", getWorkoutById);
router.post("/", createWorkout);
router.patch("/:workoutId", updateWorkout);
router.delete("/:workoutId", deleteWorkout);

router.use("/:workoutId/exercises", exercisesRouter);

export default router;