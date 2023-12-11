CREATE DATABASE IF NOT EXISTS DevDatabase;

USE DevDatabase;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    username VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    INDEX (user_id)
);

CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS zombiehunt_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    user_id BIGINT NOT NULL,
    total_kills INT DEFAULT 0,
    ammo INT DEFAULT 0,
    meat INT DEFAULT 0,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS daily_claims (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    claim_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT IGNORE INTO games (name, description) VALUES ('Zombie Hunt', 'Shoot zombies for meat! Trade meat for points or more gear.');
