CREATE DATABASE IF NOT EXISTS DevDatabase;

USE DevDatabase;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS games (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS zombiehunt_stats (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    game_id INTEGER NOT NULL,
    user_id BIGINT NOT NULL,
    total_kills INTEGER DEFAULT 0,
    ammo INTEGER DEFAULT 0,
    meat INTEGER DEFAULT 0,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS daily_claims (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    claim_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT IGNORE INTO games (name, description) VALUES ('Zombie Hunt', 'Shoot zombies for meat! Trade meat for points or more gear.');