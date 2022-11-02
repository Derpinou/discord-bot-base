import Client from './Classes/Client';
import * as dotenv from 'dotenv';
import { AllIntents } from 'oceanic.js';
import { envConf } from './Types/global';

const config = dotenv.config().parsed as unknown as envConf;
const client = new Client(config, {
	auth: 'Bot ' + config.BOT_TOKEN,
	gateway: {
		intents: AllIntents
	},
});
client.init();

