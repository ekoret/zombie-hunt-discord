const { SlashCommandBuilder } = require('discord.js');

const { DiscordUtility } = require('../../classes/DiscordUtility');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pew')
		.setDescription('Shoot and maybe kill a zombie.'),
	async execute(interaction) {
		// we have access tot he db using interaction.client.db
		// console.log(await interaction.client.discordDatabaseCRUD.getUsers());
		// console.log(await interaction.client.discordDatabaseCRUD.getGames());

		// check if the user has a record in the database

		// if there is no record
		// create one by setting the ammo to 10, daily to 0, meat to 0

		// if there is a record
		// check if the user has enough ammo to shoot

		// if the user does not have enough ammo to shoot
		// reply back with ways they can get more ammo

		//if the user does have enough ammo to shoot
		// do some random comparision if the user hits the zombie

		// if the user hits the zombie
		// increase meat count
		// decrease ammo count
		// reply back with a message saying user hit zombie with ammo count and meat count

		// if the user does not hit the zombie
		// decrease ammo count
		// reply back with a message saying user did not hit zombie with ammo count and meat count

		const name = DiscordUtility.getUserChosenName(interaction);
		await interaction.reply(`Hello ${name}!`);
	},
};
