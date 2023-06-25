# Discord Bot Boilerplate

A Discord bot that includes a command system and two example commands for testing purposes.

## Environment Setup

Before running the bot, make sure to set up the required environment variables. Follow the instructions below:

```bash
export DISCORD_BOT_TOKEN=CHANGE_ME
export DISCORD_GUILD_ID=CHANGE_ME
export DISCORD_APP_ID=CHANGE_ME
```

## Getting Started

Follow the instructions below to get started with the Discord bot:

1. Clone this repository to your local machine.
   ```bash
   git clone git@github.com:NobleMajo/discord-bot-boilerplate.git
   ```
2. Set up the required [environment variables](#environment-setup).
3. Compile the bot using the provided build command.
   ```bash
   npm run tsc
   ```
4. Start the bot and enjoy exploring the included commands.
   ```bash
   npm run start
   ```

## Development

For development purposes, you can run the bot using ts-node, which automatically restarts when files in the source folder change. Use the following command:

```bash
npm run dev
```

## Adding a New Command

Follow the steps below to add a new command to the bot:

1. Create a new file in the "cmd" folder located in the "src" directory.
   The file extension should be "<name>.cmd.ts".
2. Use the "registerCommand" function to register the new command in the global CmdManager created in the "index.js" file.
3. Start the bot and check the logs for the "Loaded commands:" message to ensure that the new command is registered successfully.

## Creating a New Project

To initialize a new Discord bot project from scratch, execute the following commands:
````bash
npm init
npm i -D typescript @types/node nodemon ts-node
npm i discord.js

npm exec -- tsc --init

mkdir src
touch src/index.ts

# copy tsconfig.json 
```

# License

This project is licensed under the MIT License.

# Contribution
 - 1. fork the project
 - 2. implement your idea
 - 3. create a pull/merge request
```ts
// please create seperated forks for different kind of featues/ideas/structure changes/implementations
```

---
**cya ;3**  
*by NobleMajo*