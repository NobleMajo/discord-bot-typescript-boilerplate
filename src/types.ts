import { Client, REST } from "discord.js";

export interface DiscordEnv {
    client: Client,
    rest: REST,
    applicationGuildCommands: `/${string}`,
}