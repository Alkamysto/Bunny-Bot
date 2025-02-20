import { ChannelResolvable, GuildResolvable, UserResolvable } from "discord.js";

type TinyInt = 1 | 0 | boolean;

export default interface Tables {
    Servers: {
        serverId: GuildResolvable | string;
        serverName: string;
    };
    Modules: {
        serverId: GuildResolvable | string;
        module1: TinyInt; //Cyberdefense
        module2: TinyInt; //Administration
        module3: TinyInt; //Moderation
        module4: TinyInt; //Levels
        module5: TinyInt; //Economy
        module6: TinyInt; //Tickets
    };
    Channels: {
        serverId: string;
        channel1: ChannelResolvable | string; //Bienvenue
        channel2: ChannelResolvable | string; //Goodbye
        channel3: ChannelResolvable | string; //Rankups
        channel4: ChannelResolvable | string; //Logs
        nolevel1: ChannelResolvable | string; //Channel SPAM 1
        nolevel2: ChannelResolvable | string; //Channel SPAM 2
        nolevel3: ChannelResolvable | string; //Channel SPAM 3
    };
    AntiRaid_Global: {
        serverId: GuildResolvable | string;
        join_limit: number;
        join_timeout: number;
        sentinelMode: TinyInt;
        blockMemberJoin: TinyInt;
        blockAllMessages: TinyInt;
        blockAllChannels: TinyInt;
    };
    Members: {
        memberId: UserResolvable | string;
        serverId: GuildResolvable | string;
        isbooster: TinyInt;
        description: string;
        join_counter: string;
    };
    Economy: {
        memberId: UserResolvable | string;
        wallet: number;
        bank: number;
        casino: number;
    };
    Leveling: {
        memberId: UserResolvable | string;
        main_level: number;
        multiplicator: number;
        xp_farmed: number;
        xp_needed: number;
    };
    Moderation: {
        memberId: UserResolvable | string;
        serverId: GuildResolvable | string;
        Bans: {
            memberId: UserResolvable | string;
            date: string;
            reason: string;
            moderator: string;
        };
        Kicks: {
            memberId: UserResolvable | string;
            date: string;
            reason: string;
            moderator: string;
        };
        Timeouts: {
            memberId: UserResolvable | string;
            date: string;
            reason: string;
            moderator: string;
        };
        Warns: {
            memberId: UserResolvable | string;
            date: string;
            reason: string;
            moderator: string;
        };
    };
};