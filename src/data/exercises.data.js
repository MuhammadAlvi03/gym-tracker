let exercises = [];
let sets = [];
let nextExerciseId = 1;
let nextSetId = 1;

export const findByWorkoutId = (workoutId) => {
    return exercises.filter(e => e.workoutId === workoutId);
}

const getNextPosition = (workoutId) => {
    let workoutExercises = findByWorkoutId(workoutId);
    if (workoutExercises.length === 0) return 1;
    return Math.max(...workoutExercises.map(e => e.position)) + 1;
}

export const create = (workoutId, name) => {
    const exercise = {
        id: nextExerciseId++,
        name,
        position: getNextPosition(workoutId),
        workoutId
    };

    exercises.push(exercise);
    return exercise;
}