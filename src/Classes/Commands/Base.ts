import ExtendedClient from '../Client';
import { AnyInteraction } from 'oceanic.js';

export default abstract class BaseCommand {
	protected constructor(protected client: ExtendedClient) {}

    abstract run(interaction: AnyInteraction, ...args: any[]): unknown;

    formatCustomID(name: string, uid: string, ...args: string[]): string {
    	return `${name}:${uid}${args ? ':'+args.join(':') : ''}`;
    }

}