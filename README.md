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
- [From scratch](#from-scratch)
    - [Dependencies](#dependencies)
    - [1. Init](#1-init)
    - [2. Base code](#2-base-code)
    - [3. Further development](#3-further-development)
- [contribution](#contribution)

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

You can get your own bot credentials from [https://discord.com/developers/applications](https://discord.com/developers/applications).

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

# From scratch
This section explains how to initialize your own TypeScript Discord bot project `from scratch`.

Please note that the explanation does not include an environment variable interface for setting the bot credentials and is not `production ready`.

### Dependencies
This requires a linux-like operating system that has the following dependencies installed: 
- `npm`,  
- `nodejs` and 
- `wget` or `curl` *(both optional)*.

### 1. Init
Initialize a new Discord bot project from scratch using the following commands:
````bash
# create the new project dir
mkdir project-name
cd project-name

# init npm and deps
npm init
npm i -D typescript @types/node nodemon ts-node
npm i discord.js

# create source files
mkdir src
touch src/index.ts

# init typescript config file
# copy tsconfig.json and .gitignore from this project or use the following wget or curl command
wget https://raw.githubusercontent.com/NobleMajo/discord-bot-typescript-boilerplate/main/tsconfig.json
# or
curl https://raw.githubusercontent.com/NobleMajo/discord-bot-typescript-boilerplate/main/tsconfig.json -o tsconfig.json
# or init (and setup like in the git repository)
npm exec -- tsc --init
````

### 2. Base code
Finally add the following source code to the `src/index.ts`:
```ts
// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js"
const token = "" // <- Add your discord bot token here. This is not for production!

// Create a new client instance
const client = new Client({
   intents: [GatewayIntentBits.Guilds]
})

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

// Log in to Discord with your client's token
client.login(token)
```

### 3. Further development
From here you can follow the discord.js guide: [https://discordjs.guide/creating-your-bot/main-file.html](https://discordjs.guide/creating-your-bot/main-file.html).

# contribution
 - 1. fork the project
 - 2. implement your idea
 - 3. create a pull/merge request
```ts
// please create seperated forks for different kind of featues/ideas/structure changes/implementations
```

---
**cya ;3**  
*by NobleMajo*


