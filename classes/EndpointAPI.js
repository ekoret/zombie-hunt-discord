class EndpointAPI {
	static async is_user_registered(id, discordDatabaseCRUD) {
		try {
			const [rows, fields] = await discordDatabaseCRUD.connection.execute(
				'SELECT * FROM `users` WHERE `id` = ?',
				[id]
			);

			if (rows.length === 0) {
				return false;
			}
		} catch (err) {
			console.log(err);
			throw err;
		}

		return true;
	}
}

module.exports = EndpointAPI;
