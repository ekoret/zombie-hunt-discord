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
		} catch (err) {
			console.log('Database connection failed: ', err);
			throw err;
		}
	}
}

module.exports = DatabaseConnectionHandler;
