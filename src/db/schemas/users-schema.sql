CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(40) UNIQUE PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(255) UNIQUE,
    hashedPassword VARCHAR(255)
);