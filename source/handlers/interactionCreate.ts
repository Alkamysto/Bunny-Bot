import { Application } from "../interfaces/application";
import { Handler } from "../interfaces/handler";
import { Interaction } from "discord.js";

export const interactionCreate: Handler = {
    async executeHandler(client: Application, interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            const commandName = interaction.commandName;
            const command = client.getCommands().find((cmd) => cmd.data.name == commandName);
            if (command) {
                command.executeCommand(client, interaction);
            };
        } else if (interaction.isButton()) {
            const interactionData = interaction.customId.split('.');
            const commandName = interactionData[0];
            const buttonId = interactionData[1];
            const command = client.getCommands().find((cmd) => cmd.data.name == commandName);
            if (command && command.executeButtons) {
                command.executeButtons(client, interaction, buttonId);
            };
        };
    },

    settings: {
        enabled: true,
    },
};

export default interactionCreate;