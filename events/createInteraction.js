const { Events } = require('discord.js');

const EndpointAPI = require('../classes/EndpointAPI');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		// Let's check here if the user making the command is registered in the database
		if (
			!EndpointAPI.is_user_registered(
				interaction.user.id,
				interaction.client.discordDatabaseCRUD
			)
		) {
			// If they're not registered in the database, then they havent connected their wordpress account to the bot
		}

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`
			);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		}
	},
};
