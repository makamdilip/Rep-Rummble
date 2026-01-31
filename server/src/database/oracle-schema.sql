-- ============================================
-- REP RUMBLE - ORACLE DATABASE SCHEMA
-- Run this in Oracle SQL Developer or Cloud Shell
-- ============================================

-- Users table
CREATE TABLE users (
    id VARCHAR2(255) PRIMARY KEY,
    email VARCHAR2(255) UNIQUE NOT NULL,
    display_name VARCHAR2(255),
    photo_url VARCHAR2(500),
    role VARCHAR2(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- User profiles (extended info)
CREATE TABLE user_profiles (
    user_id VARCHAR2(255) PRIMARY KEY REFERENCES users(id),
    height_cm NUMBER(5,2),
    weight_kg NUMBER(5,2),
    goal VARCHAR2(50), -- 'lose_weight', 'gain_muscle', 'maintain'
    activity_level VARCHAR2(50), -- 'sedentary', 'light', 'moderate', 'active', 'very_active'
    daily_calorie_goal NUMBER(6),
    daily_protein_goal NUMBER(5),
    birth_date DATE,
    gender VARCHAR2(20),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meals table
CREATE TABLE meals (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    user_id VARCHAR2(255) NOT NULL REFERENCES users(id),
    name VARCHAR2(255) NOT NULL,
    calories NUMBER(6) DEFAULT 0,
    protein NUMBER(5,1) DEFAULT 0,
    carbs NUMBER(5,1) DEFAULT 0,
    fat NUMBER(5,1) DEFAULT 0,
    fiber NUMBER(5,1) DEFAULT 0,
    sugar NUMBER(5,1) DEFAULT 0,
    sodium NUMBER(6) DEFAULT 0,
    meal_type VARCHAR2(50), -- 'breakfast', 'lunch', 'dinner', 'snack'
    image_url VARCHAR2(500),
    notes CLOB,
    health_score NUMBER(3),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_meals_user_id ON meals(user_id);
CREATE INDEX idx_meals_created_at ON meals(created_at);
CREATE INDEX idx_meals_user_date ON meals(user_id, TRUNC(created_at));

-- Meal items (individual foods in a meal)
CREATE TABLE meal_items (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    meal_id RAW(16) NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
    name VARCHAR2(255) NOT NULL,
    portion VARCHAR2(50),
    calories NUMBER(6) DEFAULT 0,
    protein NUMBER(5,1) DEFAULT 0,
    carbs NUMBER(5,1) DEFAULT 0,
    fat NUMBER(5,1) DEFAULT 0
);

CREATE INDEX idx_meal_items_meal_id ON meal_items(meal_id);

-- Workouts table
CREATE TABLE workouts (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    user_id VARCHAR2(255) NOT NULL REFERENCES users(id),
    name VARCHAR2(255) NOT NULL,
    duration NUMBER(6) DEFAULT 0, -- in minutes
    calories_burned NUMBER(6) DEFAULT 0,
    workout_type VARCHAR2(50), -- 'strength', 'cardio', 'hiit', 'yoga', 'other'
    exercises CLOB, -- JSON array of exercises
    notes CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_workouts_created_at ON workouts(created_at);

-- Exercises catalog
CREATE TABLE exercises (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    muscle_group VARCHAR2(100),
    equipment VARCHAR2(100),
    difficulty VARCHAR2(50),
    instructions CLOB,
    calories_per_minute NUMBER(4,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User exercise history
CREATE TABLE exercise_logs (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    workout_id RAW(16) REFERENCES workouts(id) ON DELETE CASCADE,
    user_id VARCHAR2(255) NOT NULL REFERENCES users(id),
    exercise_name VARCHAR2(255) NOT NULL,
    sets NUMBER(3),
    reps NUMBER(4),
    weight_kg NUMBER(5,1),
    duration_seconds NUMBER(6),
    rest_seconds NUMBER(4),
    notes VARCHAR2(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exercise_logs_user_id ON exercise_logs(user_id);

-- Weight tracking
CREATE TABLE weight_logs (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    user_id VARCHAR2(255) NOT NULL REFERENCES users(id),
    weight_kg NUMBER(5,2) NOT NULL,
    body_fat_percent NUMBER(4,1),
    muscle_mass_kg NUMBER(5,2),
    notes VARCHAR2(500),
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_weight_logs_user_id ON weight_logs(user_id);

-- Contact messages
CREATE TABLE contacts (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    email VARCHAR2(255) NOT NULL,
    message CLOB NOT NULL,
    status VARCHAR2(50) DEFAULT 'pending', -- 'pending', 'read', 'replied'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads (newsletter/waitlist)
CREATE TABLE leads (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    email VARCHAR2(255) UNIQUE NOT NULL,
    source VARCHAR2(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements/badges
CREATE TABLE achievements (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    user_id VARCHAR2(255) NOT NULL REFERENCES users(id),
    badge_name VARCHAR2(100) NOT NULL,
    badge_description VARCHAR2(500),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_achievements_user_id ON achievements(user_id);

-- Daily summaries (for faster dashboard loading)
CREATE TABLE daily_summaries (
    id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    user_id VARCHAR2(255) NOT NULL REFERENCES users(id),
    summary_date DATE NOT NULL,
    total_calories_consumed NUMBER(6) DEFAULT 0,
    total_protein NUMBER(5,1) DEFAULT 0,
    total_carbs NUMBER(5,1) DEFAULT 0,
    total_fat NUMBER(5,1) DEFAULT 0,
    total_calories_burned NUMBER(6) DEFAULT 0,
    workout_count NUMBER(3) DEFAULT 0,
    meal_count NUMBER(3) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, summary_date)
);

CREATE INDEX idx_daily_summaries_user_date ON daily_summaries(user_id, summary_date);

-- ============================================
-- VIEWS for easy querying
-- ============================================

-- Leaderboard view
CREATE OR REPLACE VIEW v_leaderboard AS
SELECT
    u.id,
    u.display_name,
    u.photo_url,
    COUNT(DISTINCT w.id) as total_workouts,
    COALESCE(SUM(w.calories_burned), 0) as total_calories_burned,
    COUNT(DISTINCT m.id) as total_meals_logged
FROM users u
LEFT JOIN workouts w ON u.id = w.user_id AND w.created_at >= SYSDATE - 30
LEFT JOIN meals m ON u.id = m.user_id AND m.created_at >= SYSDATE - 30
GROUP BY u.id, u.display_name, u.photo_url
ORDER BY total_calories_burned DESC;

-- User stats view
CREATE OR REPLACE VIEW v_user_stats AS
SELECT
    u.id as user_id,
    COUNT(DISTINCT m.id) as total_meals,
    COUNT(DISTINCT w.id) as total_workouts,
    COALESCE(SUM(m.calories), 0) as total_calories_consumed,
    COALESCE(SUM(w.calories_burned), 0) as total_calories_burned,
    COALESCE(AVG(m.health_score), 0) as avg_health_score
FROM users u
LEFT JOIN meals m ON u.id = m.user_id
LEFT JOIN workouts w ON u.id = w.user_id
GROUP BY u.id;

-- ============================================
-- SAMPLE DATA (Optional)
-- ============================================

-- Insert sample exercises
INSERT INTO exercises (name, muscle_group, equipment, difficulty, calories_per_minute) VALUES
('Push-ups', 'Chest', 'None', 'Beginner', 7);
INSERT INTO exercises (name, muscle_group, equipment, difficulty, calories_per_minute) VALUES
('Squats', 'Legs', 'None', 'Beginner', 8);
INSERT INTO exercises (name, muscle_group, equipment, difficulty, calories_per_minute) VALUES
('Deadlift', 'Back', 'Barbell', 'Intermediate', 10);
INSERT INTO exercises (name, muscle_group, equipment, difficulty, calories_per_minute) VALUES
('Bench Press', 'Chest', 'Barbell', 'Intermediate', 8);
INSERT INTO exercises (name, muscle_group, equipment, difficulty, calories_per_minute) VALUES
('Pull-ups', 'Back', 'Pull-up Bar', 'Intermediate', 9);
INSERT INTO exercises (name, muscle_group, equipment, difficulty, calories_per_minute) VALUES
('Plank', 'Core', 'None', 'Beginner', 4);
INSERT INTO exercises (name, muscle_group, equipment, difficulty, calories_per_minute) VALUES
('Running', 'Cardio', 'None', 'Beginner', 12);
INSERT INTO exercises (name, muscle_group, equipment, difficulty, calories_per_minute) VALUES
('Cycling', 'Cardio', 'Bike', 'Beginner', 10);

COMMIT;
