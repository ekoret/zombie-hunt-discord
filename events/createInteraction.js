const { Events } = require('discord.js');

const EndpointAPI = require('../classes/EndpointAPI');
const DiscordUtility = require('../classes/DiscordUtility');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const isUserRegistered = await EndpointAPI.is_user_registered(
			interaction.user.id,
			interaction.client.discordDatabaseCRUD
		);

		if (!isUserRegistered) {
			const notRegisteredEmbed = DiscordUtility.getUserNotRegisteredEmbed();

			await interaction.reply({
				embeds: [notRegisteredEmbed],
				ephemeral: true,
			});

			return;
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
