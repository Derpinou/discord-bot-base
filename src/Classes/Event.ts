import ExtendedClient from './Client';
import { AnyInteraction, InteractionTypes } from 'oceanic.js';

export default class EventHandler {
	constructor(private readonly client: ExtendedClient) {
		this.onReady = this.onReady.bind(this);
		this.onInteractionCreate = this.onInteractionCreate.bind(this);
	}

	onReady () {
		console.log(`Bot is ready as ${this.client.user.tag} (${this.client.user.id})`);
	}

	onInteractionCreate(interaction: AnyInteraction) {
		switch (interaction.type) {
		case InteractionTypes.APPLICATION_COMMAND:
			return this.client.handleCommand(interaction);
		case InteractionTypes.MESSAGE_COMPONENT:
			return this.client.handleComponent(interaction);
		case InteractionTypes.MODAL_SUBMIT:
			return this.client.handleModal(interaction);
		}


	}
}