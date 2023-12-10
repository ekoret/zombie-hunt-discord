require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Database initialization
const DatabaseConnectionHandler = require('./classes/DatabaseConnectionHandler');
const DiscordDatabaseCRUD = require('./classes/DiscordDatabaseCRUD');

const setUpDb = async () => {
	// Set up database and connect to db
	const db = new DatabaseConnectionHandler(
		process.env.DB_HOST || 'localhost',
		process.env.DB_PORT || 3306,
		process.env.DB_USER || 'root',
		process.env.DB_PASSWORD || 'password',
		process.env.DB_NAME || 'DevDatabase'
	);

	await db.connect();

	// Inject db connection into CRUD handler
	const discordDatabaseCRUD = new DiscordDatabaseCRUD(db.connection);

	return discordDatabaseCRUD;
};

const loadCommands = (client) => {
	// Handling commands
	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}
	}
};

const handleEvents = (client) => {
	// Handling events
	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs
		.readdirSync(eventsPath)
		.filter((file) => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
};

const main = async () => {
	try {
		const discordDatabaseCRUD = await setUpDb();

		// Create main discord client
		const client = new Client({ intents: [GatewayIntentBits.Guilds] });

		// Attach things to client to use within app
		client.discordDatabaseCRUD = discordDatabaseCRUD;
		client.commands = new Collection();

		// Load commands on to client
		loadCommands(client);

		// Listen and handle events
		handleEvents(client);

		// Log into discord
		client.login(process.env.BOT_TOKEN);
	} catch (error) {
		console.log('Failed to start bot:', error);
	}
};

main();
