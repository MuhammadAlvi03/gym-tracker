export let workouts = [];
export let exercises = [];
export let sets = [];
let nextWorkoutId = 1;
let nextExerciseId = 1;
let nextSetId = 1;

export const findAll = () => workouts;
export const findById = (id) => workouts.find(w => w.id === id) ?? null;

export const create = (name) => {
    const workout = {
        id: nextWorkoutId,
        name
    }
    nextWorkoutId++;
    workouts.push(workout);
    return workout;
}

export const updateName = (id, name) => {
    const workout = findById(id);
    if (!workout) return null;

    workout.name = name;
    return workout;
}

export const deleteById = (id) => {
    const workout = findById(id);
    if (!workout) return false;
    workouts = workouts.filter(w => w.id !== id);
    return true;
}