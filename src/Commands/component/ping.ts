import ComponentCommand from '../../Classes/Commands/ComponentCommand';
import ExtendedClient from '../../Classes/Client';
import { ComponentInteraction } from 'oceanic.js';

export default class PingComponentCommand extends ComponentCommand {
	constructor(client: ExtendedClient) {
		super(client);
	}
	run(interaction: ComponentInteraction, args: string[]): unknown {
		const controller = args[2];
		switch (controller) {
		case 'refresh': {
			interaction.deferUpdate().then(() => {
				interaction.message.edit({
					content: interaction.message.content === 'Pong!' ? 'Ping!' : 'Pong!',
					components: interaction.message.components
				});
			});

		}
		}
		console.log(interaction);
		return undefined;
	}
}