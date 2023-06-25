import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { registerCommand } from "../assets/DiscordCmd"

registerCommand(
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pongs you!'),
    async (
        interaction: ChatInputCommandInteraction<CacheType>
    ) => {
        await interaction.reply(
            `Pong!`
        )
    }
)
