import ApplicationCommand from '../../Classes/Commands/ApplicationCommand';
import ExtendedClient from '../../Classes/Client';
import { CommandInteraction, ComponentTypes, TextInputStyles } from 'oceanic.js';

export default class EighBallSlashCommand extends ApplicationCommand {
	constructor(client: ExtendedClient) {
		super(client);
	}
	run(interaction: CommandInteraction): unknown {
		interaction.createModal({
			title: 'Random 8ball',
			customID: this.formatCustomID('eightball', interaction.user.id, 'submit'),
			components: [
				{
					type: ComponentTypes.ACTION_ROW,
					components: [
						{
							label: 'Qustion',
							style: TextInputStyles.PARAGRAPH,
							customID: 'question',
							placeholder: 'Here !!!',
							type: ComponentTypes.TEXT_INPUT,
							required: true
						}
					]
				}
			]
		});
		return undefined;
	}
}