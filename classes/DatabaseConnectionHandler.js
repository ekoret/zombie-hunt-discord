const mysql = require('mysql2/promise');

class DatabaseConnectionHandler {
	constructor(host, port, user, password, database) {
		this.host = host;
		this.port = port;
		this.user = user;
		this.password = password;
		this.database = database;
	}

	async connect() {
		try {
			// Create a connection to check and create the database if it doesn't exist
			const initialConnection = await mysql.createConnection({
				host: this.host,
				port: this.port,
				user: this.user,
				password: this.password,
			});

			await initialConnection.query(
				`CREATE DATABASE IF NOT EXISTS \`${this.database}\`;`
			);

			// Assign connection to instance so we can use it within the app
			this.connection = await mysql.createConnection({
				host: this.host,
				port: this.port,
				user: this.user,
				password: this.password,
				database: this.database,
			});

			// Start persistent connection
			await this.connection.connect();

			// Create dependent tables if they don't exist
			await this.createTables();
		} catch (err) {
			console.log('Database connection or initilization failed: ', err);
			throw err;
		}
	}

	async createTables() {
		const queries = [
			`CREATE TABLE IF NOT EXISTS users (
                id BIGINT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                total_kills INTEGER DEFAULT 0,
                nickname VARCHAR(255) DEFAULT NULL,
                ammo INTEGER DEFAULT 0,
                meat INTEGER DEFAULT 0
            )`,
			`CREATE TABLE IF NOT EXISTS games (
                id INT AUTO_INCREMENT PRIMARY KEY,
				name VARCHAR(255) NOT NULL UNIQUE,
				description TEXT
            )`,
			`CREATE TABLE IF NOT EXISTS zombiehunt_stats (
                id INT AUTO_INCREMENT PRIMARY KEY,
				user_id BIGINT NOT NULL,
                total_kills INTEGER DEFAULT 0,
                ammo INTEGER DEFAULT 0,
                meat INTEGER DEFAULT 0,
				FOREIGN KEY (user_id) REFERENCES users(id)
            )`,
			`CREATE TABLE IF NOT EXISTS daily_claims (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id BIGINT NOT NULL,
                claim_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`,
			`INSERT IGNORE INTO games (name, description) VALUES ('Zombie Hunt', 'Shoot zombies for meat! Trade meat for points or more gear.');`,
		];

		for (const query of queries) {
			try {
				await this.connection.query(query);
			} catch (err) {
				console.log(err);
				throw err;
			}
		}
		console.log('Database initialization completed successfully');
	}

	closeConnection() {
		this.connection.end();
	}
}

module.exports = DatabaseConnectionHandler;
