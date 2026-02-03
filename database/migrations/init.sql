-- Initial migration: create core tables
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  manager_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_tokens (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE diagnostic_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  progress JSONB,
  completed_at TIMESTAMP
);

CREATE TABLE competency_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  competencies JSONB,
  strengths JSONB,
  focus_areas JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recommendations (
  id UUID PRIMARY KEY,
  competency VARCHAR(50) NOT NULL,
  recommendation TEXT NOT NULL
);

CREATE TABLE mentorships (
  id UUID PRIMARY KEY,
  mentor_id UUID REFERENCES users(id),
  mentee_id UUID REFERENCES users(id)
);

CREATE TABLE question_responses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  question_id VARCHAR(50) NOT NULL,
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
