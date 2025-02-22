drop table if exists `Servers`;
create table if not exists `Servers` (
    `serverId` varchar(18) not null,
    `serverName` varchar(100) not null,
    unique index `Servers_serverId_key`(`serverId`),
    primary key (`serverId`)
) engine=InnoDB default character set utf8mb4 collate utf8mb4_unicode_ci;

drop table if exists `Modules`;
create table if not exists `Modules` (
    `serverId` varchar(18) not null,
    `module1` boolean not null default false,
    `module2` boolean not null default false,
    `module3` boolean not null default false,
    `module4` boolean not null default false,
    `module5` boolean not null default false,
    `module6` boolean not null default false,
    unique index `Modules_serverId_key`(`serverId`),
    primary key (`serverId`)
) engine=InnoDB default character set utf8mb4 collate utf8mb4_unicode_ci;

drop table if exists `Channels`;
create table if not exists `Channels` (
    `serverId` varchar(18) not null,
    `channel1` varchar(18) not null,
    `channel2` varchar(18) not null,
    `channel3` varchar(18) not null,
    `channel4` varchar(18) not null,
    `nolevel1` varchar(18) not null,
    `nolevel2` varchar(18) not null,
    `nolevel3` varchar(18) not null,
    unique index `Channels_serverId_key`(`serverId`),
    primary key (`serverId`)
) engine=InnoDB default character set utf8mb4 collate utf8mb4_unicode_ci;

drop table if exists `AntiRaid`;
create table if not exists `AntiRaid` (
    `serverId` varchar(18) not null,
    `join_limit` int not null default 3,
    `join_timeout` int not null default 10000,
    `sentimelMode` boolean not null default false,
    `blockMemberJoin` boolean not null default false,
    `blockAllMessages` boolean not null default false,
    `blockAllChannels` boolean not null default false,
    unique index `Antiraid_serverId_key`(`serverId`),
    primary key (`serverId`)
) engine=InnoDB default character set utf8mb4 collate utf8mb4_unicode_ci;

drop table if exists `Members`;
create table if not exists `Members` (
    `memberId` varchar(18) not null,
    `serverId` varchar(18) not null,
    `isbooster`: boolean not null default false,
    `description` varchar(255) not null 'Aucune description',
    `join_counter` int not null default 0,
    unique key `Members_memberId_key`(`memberId`),
    unique key `Members_serverId_key`(`serverId`),
    primary key (`memberId`, `serverId`)
) engine=InnoDB default character set utf8mb4 collate utf8mb4_unicode_ci;

drop table if exists `Economy`;
create table if not exists `Economy` (
    `memberId` varchar(18) not null,
    `wallet` int not null default 5000,
    `bank` int not null default 0,
    `casino` int not null default 0,
    unique key `Economy_memberId_key`(`memberId`),
    primary key (`memberId`)
) engine=InnoDB default character set utf8mb4 collate utf8mb4_unicode_ci;

drop table if exists `Leveling`;
create table if not exists `Leveling` (
    `memberId` varchar(18) not null,
    `main_level` int not null default 1,
    `multiplicator` varchar(10) not null default 'RANG D',
    `xp_farmed` int not null default 0,
    `xp_farmed` int not null default 200,
    unique key `Leveling_memberId_key`(`memberId`),
    primary key(`memberId`)
) engine=InnoDB default character set utf8mb4 collate utf8mb4_unicode_ci;

drop table if exists `Moderation`;
create table if not exists `Moderation` (
    `memberId` varchar(18) not null,
    `serverId` varchar(18) not null,
    unique key `Moderation_memberId_key`(`memberId`),
    unique key `Moderation_serverId_key`(`serverId`),
    primary key (`memberId`, `serverId`)
) engine=InnoDB default character set utf8mb4 collate utf8mb4_unicode_ci;