import { Client, ClientOptions, CommandInteraction, ComponentInteraction, ModalSubmitInteraction } from 'oceanic.js';
import { envConf } from '../Types/global';
import ApplicationCommand from './Commands/ApplicationCommand';
import ComponentCommand from './Commands/ComponentCommand';
import PingSlashCommand from '../Commands/application/ping';
import PingComponentCommand from '../Commands/component/ping';
import EventHandler from './Event';
import ModalCommand from './Commands/ModalCommand';
import EighBallSlashCommand from '../Commands/application/eightBall';
import EightBallModalCommand from '../Commands/modal/eightball';

export default class ExtendedClient extends Client {
	private ApplicationCommands: Map<string, ApplicationCommand> = new Map<string, ApplicationCommand>();
	private ComponentCommands: Map<string, ComponentCommand> = new Map<string, ComponentCommand>();
	private ModalCommands: Map<string, ModalCommand> = new Map<string, ModalCommand>();
	private eventHandler: EventHandler = new EventHandler(this);

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
		const cmd = this.ApplicationCommands.get(name);
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
		this.loadApplicationCommands();
		this.loadComponentCommands();
		this.loadModalCommands();
	}

	private loadApplicationCommands () {
		this.ApplicationCommands.set('ping', new PingSlashCommand(this));
		this.ApplicationCommands.set('8ball', new EighBallSlashCommand(this));
	}

	private loadComponentCommands () {
		this.ComponentCommands.set('ping', new PingComponentCommand(this));
	}


	private loadModalCommands () {
		this.ModalCommands.set('eightball', new EightBallModalCommand(this));
	}

}