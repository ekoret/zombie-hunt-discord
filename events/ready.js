const { Events } = require('discord.js');

const db = require('../classes/DiscordDatabase');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		new db().initializeDatabase();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
