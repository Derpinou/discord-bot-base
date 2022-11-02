import ModalCommand from '../../Classes/Commands/ModalCommand';
import ExtendedClient from '../../Classes/Client';
import { ModalSubmitInteraction } from 'oceanic.js';

export default class EightBallModalCommand extends ModalCommand {
	constructor(client: ExtendedClient) {
		super(client);
	}
	run (interaction: ModalSubmitInteraction, args: string[]) {

		interaction.createMessage({
			content: 'Yes',
			flags: 64
		});
        
	}
}