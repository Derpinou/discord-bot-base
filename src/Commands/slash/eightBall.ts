import SlashCommand from '../../Classes/Commands/SlashCommand';
import ExtendedClient from '../../Classes/Client';
import { CommandInteraction, ComponentTypes, TextInputStyles } from 'oceanic.js';

export default class EighBallSlashCommand extends SlashCommand {
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