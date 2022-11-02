import SlashCommand from '../../Classes/Commands/SlashCommand';
import ExtendedClient from '../../Classes/Client';
import { ButtonStyles, CommandInteraction, ComponentTypes } from 'oceanic.js';

export default class PingSlashCommand extends SlashCommand {
	constructor(client: ExtendedClient) {
		super(client);
	}
	run(interaction: CommandInteraction): unknown {
		interaction.createMessage({
			content: 'Pong!',
			components: [
				{
					type: ComponentTypes.ACTION_ROW,
					components: [
						{
							type: ComponentTypes.BUTTON,
							label: 'Refresh',
							emoji: {
								name: '🔄',
								id: null,
							},
							customID: this.formatCustomID('ping', interaction.user.id, 'refresh'),
							style: ButtonStyles.PRIMARY
						}
					]
				}
			]
		});
		return undefined;
	}
}