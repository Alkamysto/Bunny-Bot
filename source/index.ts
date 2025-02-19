import { config as envConfig } from "dotenv";
import { Application } from "./interfaces/application";
import chalk from "chalk";

envConfig();
const client = new Application();

async function launchingDevice(token: string, cache: string): Promise<void> {
  console.log(chalk.bold.magenta(client.getLogger().ascii));

  await client.loadHandlers('handlers');
  await client.loadCommands('commands');

  if (cache === 'clear') {
    console.log("Resetting cache");
    await client.breakSync();
  }

  await client.syncInts({ commands: true });
  await client.login(token);
}

launchingDevice(process.env.TOKEN!, process.env.CACHE!);

process.on("uncaughtException", (error) => {
  client.getLogger().send(`UncaughtException : ${error}`, "ERROR");
});

process.on("unhandledRejection", (error) => {
  client.getLogger().send(`UnhandledRejection : ${error}`, "ERROR");
});
