import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { registerCommand } from "../assets/DiscordCmd"

registerCommand(
    new SlashCommandBuilder()
        .setName('random')
        .setDescription('Shows a random number between 0 and 1!'),
    async (
        interaction: ChatInputCommandInteraction<CacheType>
    ) => {
        await interaction.reply("Your random number: " + Math.random())
    }
)
