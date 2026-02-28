export const isValidId = (workoutId) => {
    return (Number.isInteger(workoutId) && workoutId >= 1);
}