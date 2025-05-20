-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Resume table
CREATE TABLE IF NOT EXISTS resume (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experience table
CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resume(id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resume(id) ON DELETE CASCADE,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resume(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    level INTEGER CHECK (level BETWEEN 1 AND 5),
    category VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resume(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_id VARCHAR(255),
    credential_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Technologies table
CREATE TABLE IF NOT EXISTS technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Technologies junction table
CREATE TABLE IF NOT EXISTS project_technologies (
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    technology_id INTEGER REFERENCES technologies(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, technology_id)
);

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resume_updated_at
    BEFORE UPDATE ON resume
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_updated_at
    BEFORE UPDATE ON experience
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at
    BEFORE UPDATE ON education
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
    BEFORE UPDATE ON skills
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
    BEFORE UPDATE ON certifications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 