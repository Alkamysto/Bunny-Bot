drop table if exists `Servers`;
create table if not exists `Servers` (
    `serverId` varchar(18) not null,
    `serverName` varchar(100) not null,
    unique index `Servers_serverId_key`(`serverId`),
    primary key (`serverId`)
) engine=InnoDB default character set utf8mb4 collate utf8mb4_unicode_ci;