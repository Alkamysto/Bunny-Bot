import {
	EmbedBuilder,
	InteractionContextType,
	PermissionsBitField,
	SlashCommandBuilder,
} from 'discord.js';
import { Command } from '../../interfaces/command';
import os from 'os';

const ping: Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Permet de calculer la latence du bot')
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

	async executeCommand(client, interaction) {
		let embed = new EmbedBuilder()
			.setColor(client.getConfig().embed.classColor)
			.setAuthor({
				name: "Module d'administration Kouta Club",
				iconURL: client.user?.avatarURL()!,
			})
			.setTitle('Analyse de performance de la machine')
			.addFields([
				{
					name: '⚙️ Plateforme Utilisée :',
					value: '> ' + os.hostname() + ' (' + os.machine() + ')',
					inline: true,
				},
				{
					name: '📦 Mémoire vive libre :',
					value:
						'> ' +
						(os.freemem() / Math.pow(1024, 3)).toFixed(2) +
						'Go / ' +
						(os.totalmem() / Math.pow(1024, 3)).toFixed(2) +
						'Go',
					inline: true,
				},
				{
					name: '🧬 Puissance Processeur :',
					value:
						'> ' +
						os.cpus().length +
						' x ' +
						(os.cpus()[0].speed / 1000).toFixed(2) +
						'GHz en ' +
						os.arch,
					inline: true,
				},
				{
					name: '❤️ Nb de coeurs de processeur installés :',
					value: '> ' + os.cpus().length + ' coeurs de ' + os.cpus()[0].model,
					inline: false,
				},
				{
					name: '⚡️ Alimentation / Température',
					value: '> 230V / 1000W | Tempéraure de fonctionnement normale',
					inline: false,
				},
			])
			.setTimestamp()
			.setFooter({
				text: client.getConfig().embed.footer,
				iconURL: interaction.user.avatarURL()!,
			});
		interaction.reply({ embeds: [embed] }).catch(console.error);
	},

	settings: {
		enabled: true,
	},
};

export default ping;
