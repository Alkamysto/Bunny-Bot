import { ColorResolvable, GatewayIntentBits, Partials } from 'discord.js';

interface Config {
	intents: GatewayIntentBits[];
	partials: Partials[];
	guildId: string;

	embed: {
		footer: string;
		classColor: ColorResolvable;
		errorColor: ColorResolvable;
		alertColor: ColorResolvable;
		readyColor: ColorResolvable;
		notifColor: ColorResolvable;
	};
}

export default Config;
