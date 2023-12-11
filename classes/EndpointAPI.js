class EndpointAPI {
	static async is_user_registered(id, discordDatabaseCRUD) {
		try {
			const [rows] = await discordDatabaseCRUD.connection.execute(
				'SELECT id FROM `users` WHERE `id` = ?',
				[id]
			);
			if (rows.length === 0) {
				return false;
			}

			return true;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
}

module.exports = EndpointAPI;
