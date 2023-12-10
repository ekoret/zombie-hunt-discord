class DiscordDatabaseCRUD {
	constructor(connection) {
		this.connection = connection;
	}

	async getUsers() {
		try {
			const [rows, fields] = await this.connection.execute(
				'SELECT * FROM `users`;'
			);

			return rows;
		} catch (err) {
			console.log('Database Error for getUsers: ', err);
			throw err;
		}
	}

	async getGames() {
		try {
			const [rows, fields] = await this.connection.execute(
				'SELECT * FROM `games`;'
			);

			return rows;
		} catch (err) {
			console.log('Database Error for getGames: ', err);
			throw err;
		}
	}
}

module.exports = DiscordDatabaseCRUD;
