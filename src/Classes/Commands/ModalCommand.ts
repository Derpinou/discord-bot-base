import ExtendedClient from '../Client';
import { ModalSubmitInteraction } from 'oceanic.js';
import BaseCommand from './Base';

export default abstract class ModalCommand extends BaseCommand {
	protected constructor(client: ExtendedClient) {
		super(client);
	}
    abstract run (interaction: ModalSubmitInteraction, args: string[]): unknown;


}