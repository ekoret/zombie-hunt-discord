class DiscordDatabaseCRUD {
	constructor(connection) {
		this.connection = connection;
	}

	async getUsers() {
		try {
			await this.connection.query('SELECT * FROM `users`;');
		} catch (err) {
			console.log('Database Error for getUsers: ', err);
			throw err;
		}
	}

	async getGames() {
		try {
			results = await this.connection.query('SELECT * FROM `games`;');
			console.log(results);
		} catch (err) {
			console.log('Database Error for getGames: ', err);
			throw err;
		}
	}
}

module.exports = DiscordDatabaseCRUD;
