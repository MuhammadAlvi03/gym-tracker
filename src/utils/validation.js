export const isValidId = (workoutId) => {
    return (Number.isInteger(workoutId) && workoutId >= 1);
}


export const validateName = (name) => {
    if (name === undefined)
        return {
            valid: false,
            error: "No name provided"
        };
    
    if (typeof(name) !== "string" || !name.trim())
        return {
            valid: false,
            error: "Invalid name"
        };
    
    return {
        valid: true,
        value: name.trim()
    };
}