import ExtendedClient from '../Client';
import { CommandInteraction } from 'oceanic.js';
import BaseCommand from './Base';

export default abstract class ApplicationCommand extends BaseCommand {
	protected constructor(client: ExtendedClient) {
		super(client);
	}
	abstract run (interaction: CommandInteraction): unknown;
}