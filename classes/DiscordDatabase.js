class DiscordDatabase {
	constructor() {
		const sqlite3 = require('sqlite3').verbose();
		this.db = new sqlite3.Database(
			'./instance/database.db',
			(err) => err && console.log(err)
		);
	}

	initializeDatabase() {
		this.db.serialize(() => {
			// Create the users table
			this.db.run(
				'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, total_kills INTEGER DEFAULT 0, nickname TEXT DEFAULT NULL, ammo INTEGER DEFAULT 0, meat INTEGER DEFAULT 0)',
				(err) => {
					if (err) console.error('Error creating users table:', err.message);
				}
			);

			// Create the daily claims table
			this.db.run(
				'CREATE TABLE IF NOT EXISTS daily_claims (id INTEGER PRIMARY KEY, user_id INTEGER, claim_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id))',
				(err) => {
					if (err)
						console.error('Error creating daily_claims table:', err.message);
				}
			);
		});
	}

	closeDatabase() {
		this.db.close((err) => {
			if (err) console.error('Error closing the database:', err.message);
		});
	}
}

module.exports = DiscordDatabase;
