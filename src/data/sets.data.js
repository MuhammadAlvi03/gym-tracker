let sets = [];
let nextSetId = 1;

const findSetById = (setId) => 
    sets.find(s => s.id === setId);

export const findAllByExerciseId = (exerciseId) => 
    sets.filter(s => s.exerciseId === exerciseId);

const getNextSetPosition = (exerciseId) => {
    let exerciseSets = findAllByExerciseId(exerciseId);
    if (exerciseSets.length === 0) return 1;
    return Math.max(...exerciseSets.map(s => s.position)) + 1;
}


export const createSet = (exerciseId, weight, reps) => {
    const createdSet = {
        id :nextSetId++,
        weight,
        reps,
        position: getNextSetPosition(exerciseId),
        exerciseId
    }

    sets.push(createdSet);
    return createdSet;
}


export const deleteSetById = (setId) => {
    const set = findSetById(setId);
    if (!set) return false;

    sets = sets.filter(s => s != set);
    return true;
}