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
  - [Environment setup](#environment-setup)
  - [Getting Started](#getting-started)
  - [Development](#development)
- [Custom cmd](#custom-cmd)
- [New project](#new-project)
- [copy tsconfig.json](#copy-tsconfigjson)

# About
The Discord Bot Boilerplate is a versatile foundation for building custom TypeScript Discord bots with ease.

It provides a:
- comprehensive command system,
- environment variable setup,
- and example commands for quick testing and customization.

The Discord Bot Boilerplate is a perfect starting point for `TypeScript` developers who want to `quickly kickstart` their bot projects.
It provides a `100% type-safe` boilerplate, ensuring a robust foundation for building Discord bots.

## Environment setup

Before running the bot, make sure to set up your environment variables as follows:
```bash
export DISCORD_BOT_TOKEN=CHANGE_ME
export DISCORD_GUILD_ID=CHANGE_ME
export DISCORD_MEMBER_ROLE_ID=CHANGE_ME
```

## Getting Started

Follow the instructions below to get started with the Discord bot:

1. Clone this repository to your local machine.
   ```bash
   git clone git@github.com:NobleMajo/discord-bot-typescript-boilerplate.git
   ```
3. Set up the required [environment variables](#environment-setup).
4. Compile the bot using the provided build command.
   ```bash
   npm run tsc
   ```
5. Start the bot and enjoy exploring the included commands.
   ```bash
   npm run start
   ```

## Development
For development purposes, you can use the following command to run the bot using `ts-node`, which automatically restarts when files in the source folder change:
```
npm run dev
```

# Custom cmd
1. Create a file in the `./src/cmds` folder.
   The file extension should be `<name>.cmd.ts`.
2. Use the `registerCommand(<builder>, <handler>)` function to register a new command in the global CmdManager created in the `index.js`
3. Check if the command get registered by starting the bot and check the `# Loaded commands:` logs.

# New project
Initialize a new Discord bot project from scratch using the following commands:
````bash
npm init
npm i -D typescript @types/node nodemon ts-node
npm i discord.js

npm exec -- tsc --init

mkdir src
touch src/index.ts

# copy tsconfig.json 
```