import { Application } from "../interfaces/application";
import { Handler } from "../interfaces/handler";
import { ActivityType } from "discord.js";
import abbreviate from "numabbr";

import { name, version } from '../../package.json';

export const ready: Handler = {
    async executeHandler(client: Application) {

        let memberCount: number = 0;
        client.guilds.cache.forEach((guild) => {
            memberCount += guild.memberCount;
        });

        let status: string[] = [
            `Programme : ${name}@${version}`,
            `Surveille : ${client.guilds.cache.size} serveurs`,
            `Protège ${abbreviate(memberCount)} utilisateurs`,
            "https://kouta.club/apps/kouta-bot"
        ];

        setInterval(() => {
            let randomiser = Math.floor(Math.random() * status.length);
            client.user?.setActivity({
                name: status[randomiser],
                type: ActivityType.Listening
            });
        }, 60000);

        client.getLogger().send(`Client logged-in with the tag ${client.user?.tag}`, 'READY');
    },

    settings: {
        enabled: true
    },
};

export default ready;