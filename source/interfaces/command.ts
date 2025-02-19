import { ButtonInteraction, ChatInputCommandInteraction } from "discord.js";
import { Application } from "./application";

export interface Command {
  data: any;

  executeCommand(
    client: Application,
    interaction: ChatInputCommandInteraction
  ): void;
  executeButtons?(
    client: Application,
    interaction: ButtonInteraction,
    buttonId: string
  ): void;

  settings: {
    enabled: boolean;
  };
}