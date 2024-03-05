CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(40) UNIQUE PRIMARY KEY,
    name VARCHAR(50),
    category VARCHAR(50),
    description VARCHAR(255),
    imgUrl VARCHAR(255)
);