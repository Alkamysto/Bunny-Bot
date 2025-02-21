import { Client, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import Config from './config';
import Logger from '../utils/logger';
import configFile from '../configs/settings.test';
import { Command } from './command';

export class Application extends Client {
	private config: Config = configFile;
	private logger: Logger = new Logger();
	private commands: Command[] = [];
	createShard: any;

	constructor() {
		super({
			intents: configFile.intents,
			partials: configFile.partials,
			allowedMentions: { parse: ['roles', 'users'], repliedUser: false },
		});
	}

	public getConfig(): Config {
		return this.config;
	}

	public getLogger(): Logger {
		return this.logger;
	}

	public getCommands(): Command[] {
		return this.commands;
	}

	public async loadHandlers(folderName: string): Promise<void> {
		const files = readdirSync(join(__dirname, '..', folderName));
		for (const file of files) {
			const handler = require(join(__dirname, '..', folderName, file));
			if (handler.default.settings.enabled) {
				const handlerName = file.split('.')[0];
				this.on(handlerName, (...args) =>
					handler.default.executeHandler(this, ...args)
				);
				this.getLogger().send(`Handler loaded: ${handlerName}`, 'NOTIF');
			}
		}
		this.getLogger().send(
			`LoadHandlers passed : ${files.length} handlers`,
			'READY'
		);
	}

	public async loadCommands(folderName: string): Promise<void> {
		const subfolders = readdirSync(join(__dirname, '..', folderName));
		for (const folder of subfolders) {
			const files = readdirSync(join(__dirname, '..', folderName, folder));
			for (const file of files) {
				const command = require(
					join(__dirname, '..', folderName, folder, file)
				);
				const commandName = file.split('.')[0];
				if (command.default.settings.enabled) {
					this.commands.push(command.default);
					this.getLogger().send(`Trigger loaded: ${commandName}`, 'NOTIF');
				}
			}
		}
		this.getLogger().send(
			`LoadCommands passed : ${this.commands.length} commands `,
			'READY'
		);
	}

	private async getSyncInts(syncInts: SyncInts): Promise<unknown[]> {
		const data = [];
		if (syncInts.commands) {
			if (this.commands.length === 0) {
				this.getLogger().send(
					'No slash commands are ready for cache synchronization',
					'ERROR'
				);
			} else {
				this.getLogger().send(
					`Synchronization of ${this.commands.length} slash commands`,
					'READY'
				);
				data.push(...this.commands.map((cmd) => cmd.data.toJSON()));
			}
		}
		return data;
	}

	public async syncInts(syncInts: SyncInts): Promise<void> {
		const data = await this.getSyncInts(syncInts);
		if (data.length === 0)
			return this.getLogger().send(
				'No slash commands enterred for synchronization',
				'ERROR'
			);
		const rest = new REST({ version: '10' }).setToken(
			process.env.CLIENT_TOKEN!
		);
		try {
			rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
				body: data,
			});
		} catch (e) {
			this.getLogger().send(`${e}`, 'ERROR');
		}
	}

	public async breakSync(): Promise<void> {
		await this.application?.commands.set([]);
		for (const guild of this.guilds.cache.values()) {
			await guild.commands.set([]);
		}
	}
}

interface SyncInts {
	commands?: boolean;
}
