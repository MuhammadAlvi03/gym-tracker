import { Router } from "express";
import { 
    getWorkouts,
    createWorkout,
    updateWorkout
} from "../controllers/workouts.controller.js";

const router = Router();

router.get("/", getWorkouts);
router.post("/", createWorkout);
router.patch("/:workoutId", updateWorkout);

export default router;