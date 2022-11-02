import ExtendedClient from '../Client';
import { ComponentInteraction } from 'oceanic.js';
import BaseCommand from './Base';

export default abstract class ComponentCommand extends BaseCommand {
	protected constructor(client: ExtendedClient) {
		super(client);
	}
    abstract run (interaction: ComponentInteraction, args: string[]): unknown;


}