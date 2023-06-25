import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { registerCommand } from "../assets/DiscordCmd";

registerCommand(
    new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(
            option => option
                .setName('msg')
                .setDescription('The input to echo back')
                .setRequired(true)
        ),
    async (
        interaction: ChatInputCommandInteraction<CacheType>
    ) => {
        const msg = interaction.options.getString('msg')
        await interaction.reply(
            `This command was run by ${interaction.user.username}, who joined on ${(interaction as any).member.joinedAt}\nMessage: ${msg}`
        )
    }
)
