import * as typenvy from "typenvy"
export const envDefaults = {
    PRODUCTION: false as boolean,

    DISCORD_BOT_TOKEN: "CHANGE_ME" as string,
    DISCORD_APP_ID: "CHANGE_ME" as string,
    DISCORD_GUILD_ID: "CHANGE_ME" as string,
    DISCORD_MEMBER_ROLE_ID: "CHANGE_ME" as string,
    DISCORD_VERIFY_CHANNEL_ID: "CHANGE_ME" as string,
    DISCORD_VERIFY_CATEGORY_ID: "CHANGE_ME" as string,
}

export const envTypes: typenvy.VariablesTypes = {
    PRODUCTION: [typenvy.TC_BOOLEAN],

    DISCORD_BOT_TOKEN: [typenvy.TC_STRING],
    DISCORD_APP_ID: [typenvy.TC_STRING],
    DISCORD_GUILD_ID: [typenvy.TC_STRING],
    DISCORD_MEMBER_ROLE_ID: [typenvy.TC_STRING],
    DISCORD_VERIFY_CHANNEL_ID: [typenvy.TC_STRING],
    DISCORD_VERIFY_CATEGORY_ID: [typenvy.TC_STRING],
}