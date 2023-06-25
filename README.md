# discord bot boilerplate

![MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![typescript](https://img.shields.io/badge/dynamic/json?style=plastic&color=blue&label=Typescript&prefix=v&query=devDependencies.typescript&url=https%3A%2F%2Fraw.githubusercontent.com%2Fnoblemajo%2Fdiscord-bot-typescript-boilerplate%2Fmain%2Fpackage.json)
![github](https://img.shields.io/badge/dynamic/json?style=plastic&color=darkviolet&label=GitHub&prefix=v&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fnoblemajo%2Fdiscord-bot-typescript-boilerplate%2Fmain%2Fpackage.json)

![](https://img.shields.io/badge/dynamic/json?color=green&label=watchers&query=watchers&suffix=x&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fnoblemajo%2Fdiscord-bot-typescript-boilerplate)
![](https://img.shields.io/badge/dynamic/json?color=yellow&label=stars&query=stargazers_count&suffix=x&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fnoblemajo%2Fdiscord-bot-typescript-boilerplate)
![](https://img.shields.io/badge/dynamic/json?color=orange&label=subscribers&query=subscribers_count&suffix=x&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fnoblemajo%2Fdiscord-bot-typescript-boilerplate)
![](https://img.shields.io/badge/dynamic/json?color=navy&label=forks&query=forks&suffix=x&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fnoblemajo%2Fdiscord-bot-typescript-boilerplate)
![](https://img.shields.io/badge/dynamic/json?color=darkred&label=open%20issues&query=open_issues&suffix=x&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fnoblemajo%2Fdiscord-bot-typescript-boilerplate)

# Table of Contents
- [discord bot boilerplate](#discord-bot-boilerplate)
- [Table of Contents](#table-of-contents)
- [About](#about)
- [env](#env)
- [starting](#starting)
- [development](#development)
- [New cmd](#new-cmd)
- [new porject](#new-porject)
- [copy tsconfig.json](#copy-tsconfigjson)

# About
The Discord Bot Boilerplate is a versatile foundation for building custom TypeScript Discord bots with ease.

It provides a:
- comprehensive command system,
- environment variable setup,
- and example commands for quick testing and customization.

The Discord Bot Boilerplate is a perfect starting point for `TypeScript` developers who want to `quickly kickstart` their bot projects.
It provides a `100% type-safe` boilerplate, ensuring a robust foundation for building Discord bots.

# env
Before running the bot, you need to set up your environment variables like the following:
```bash
export DISCORD_BOT_TOKEN=CHANGE_ME
export DISCORD_GUILD_ID=CHANGE_ME
export DISCORD_MEMBER_ROLE_ID=CHANGE_ME
export DISCORD_VERIFY_CHANNEL_ID=CHANGE_ME
export DISCORD_VERIFY_CATEGORY_ID=CHANGE_ME
export DISCORD_APP_ID=CHANGE_ME
```

# starting
Use the following command to compile and then start the bot:
```bash
npm run tsc
npm run start
```

# development
Use the following command to run the bot with `ts-node` and automatically start when files in the source folder change:
```
npm run dev
```

# New cmd
1. Create a file in the `./src/cmds` folder.
   The file extension should be `<name>.cmd.ts`.
2. Use the `registerCommand(<builder>, <handler>)` function to register a new command in the global CmdManager created in the `index.js`
3. Check if the command get registered by starting the bot and check the `# Loaded commands:` logs.

# new porject
Init a new discord bot project from scratch with the following commands:
````bash
npm init
npm i -D typescript @types/node nodemon ts-node
npm i discord.js

npm exec -- tsc --init

mkdir src
touch src/index.ts

# copy tsconfig.json 
```