import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js"
import { CmdManager } from "./assets/DiscordCmd"
import { env } from "./env/envParser"
import { DiscordEnv } from "./types"

console.log("# Init bot...")
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, (client) => {
    console.log(`# Ready! Logged in as ${client.user.tag}`)
})

export const discordEnv: DiscordEnv = {
    client,
    rest: new REST({
        version: '10'
    }).setToken(
        env.DISCORD_BOT_TOKEN
    ),
    applicationGuildCommands: Routes.applicationGuildCommands(env.DISCORD_APP_ID, env.DISCORD_GUILD_ID),
}

const cmdManager = new CmdManager()

cmdManager.loadCommands().then(async () => {
    const cmds = await cmdManager.applyCmds(discordEnv)
    console.log("# Loaded commands: ", cmds)

    console.log("# Bot login...")
    await client.login(env.DISCORD_BOT_TOKEN)
    console.log("# Bot logged in!")
})

