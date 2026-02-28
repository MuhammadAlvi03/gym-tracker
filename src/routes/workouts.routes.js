import { Router } from "express";
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

export default router;