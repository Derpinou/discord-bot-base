import * as dotenv from 'dotenv';
import { REST } from '@discordjs/rest';

import { ApplicationCommandTypes, CreateGuildApplicationCommandOptions, Routes, } from 'oceanic.js';
import { envConf } from './Types/global';

const config = dotenv.config().parsed as unknown as envConf;

const commands: CreateGuildApplicationCommandOptions[] = [
	{
		name: 'ping',
		description: 'ping',
		type: ApplicationCommandTypes.CHAT_INPUT
	}, {
		name: '8ball',
		description: 'Random 8ball',
		type: ApplicationCommandTypes.CHAT_INPUT
	}, {
		name: 'report',
		type: ApplicationCommandTypes.MESSAGE
	}
];

const rest = new REST({ version: '10' }).setToken(config['BOT_TOKEN']);

console.log('Started refreshing application (/) commands.');
rest.put(Routes.GUILD_APPLICATION_COMMANDS(config['BOT_ID'], config['SERVER_ID']), { body: commands }).then(() => {
	console.log('Successfully reloaded application (/) commands.');
}).catch(console.error);



