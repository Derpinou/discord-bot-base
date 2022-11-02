import { Client, ClientOptions, CommandInteraction, ComponentInteraction, ModalSubmitInteraction } from 'oceanic.js';
import { envConf } from '../Types/global';
import SlashCommand from './Commands/SlashCommand';
import ComponentCommand from './Commands/ComponentCommand';
import PingSlashCommand from '../Commands/slash/ping';
import PingComponentCommand from '../Commands/component/ping';
import Event from './Event';
import ModalCommand from './Commands/ModalCommand';
import EighBallSlashCommand from '../Commands/slash/eightBall';
import EightBallModalCommand from '../Commands/modal/eightball';

export default class ExtendedClient extends Client {
	private SlashCommands: Map<string, SlashCommand> = new Map<string, SlashCommand>();
	private ComponentCommands: Map<string, ComponentCommand> = new Map<string, ComponentCommand>();
	private ModalCommands: Map<string, ModalCommand> = new Map<string, ModalCommand>();
	private eventHandler: Event = new Event(this);

	constructor(private readonly conf: envConf, options?: ClientOptions) {
		super(options);
	}

	public init () {
		this.connect().catch(console.error);
		this.loadCommands();
		this.handleEvents();
	}


	private handleEvents () {
		this.on('ready', this.eventHandler.onReady);
		this.on('interactionCreate', this.eventHandler.onInteractionCreate);
	}

	public handleCommand (interaction: CommandInteraction) {
		const name = interaction.data.name;
		const cmd = this.SlashCommands.get(name);
		if (cmd) return cmd.run(interaction);
	}

	public handleComponent (interaction: ComponentInteraction) {
		const args = interaction.data.customID.split(':');

		// 0 command
		// 1 for uid
		// 2 for controller
		// n for other params
		const name = args[0];
		const uid = args[1] !== 'null' ? args[1] : null;

		// If no user id required in command, do nothing
		if (uid !== null && uid !== interaction.user.id) return;

		const cmd = this.ComponentCommands.get(name);

		if (cmd) return cmd.run(interaction, args);
	}

	public handleModal (interaction: ModalSubmitInteraction) {
		const args = interaction.data.customID.split(':');

		// 0 command
		// 1 for uid
		// 2 for controller
		// n for other params
		const name = args[0];
		const uid = args[1] !== 'null' ? args[1] : null;

		// If no user id required in command, do nothing
		if (uid !== null && uid !== interaction.user.id) return;

		const cmd = this.ModalCommands.get(name);

		if (cmd) return cmd.run(interaction, args);

		return;
	}

	private loadCommands () {
		this.loadSlashCommands();
		this.loadComponentCommands();
		this.loadModalCommands();
	}

	private loadSlashCommands () {
		this.SlashCommands.set('ping', new PingSlashCommand(this));
		this.SlashCommands.set('8ball', new EighBallSlashCommand(this));
	}

	private loadComponentCommands () {
		this.ComponentCommands.set('ping', new PingComponentCommand(this));
	}


	private loadModalCommands () {
		this.ModalCommands.set('eightball', new EightBallModalCommand(this));
	}

}