CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE workouts(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    workout_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) REFERENCES users(id)
        ON DELETE CASCADE
        
);


CREATE TABLE exercises(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    workout_id INT NOT NULL,
    CONSTRAINT fk_workout
        FOREIGN KEY(workout_id) REFERENCES workouts(id)
        ON DELETE CASCADE
);


CREATE TABLE exercise_sets(
    id SERIAL PRIMARY KEY,
    weight NUMERIC,
    reps INT NOT NULL,
    exercise_id INT NOT NULL,
    CONSTRAINT fk_exercise
        FOREIGN KEY(exercise_id) REFERENCES exercises(id)
        ON DELETE CASCADE,
    CONSTRAINT reps_nonnegative CHECK(reps >= 0),
    CONSTRAINT weight_nonnegative CHECK(weight IS NULL OR weight >= 0)
);