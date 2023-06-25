# discord bot boilerplate
A discord bot that has already a cmd system and two example commands for tests.

# env
Before running the bot, you need to set up your environment variables like the following:
```bash
export DISCORD_BOT_TOKEN=CHANGE_ME
export DISCORD_GUILD_ID=CHANGE_ME
export DISCORD_APP_ID=CHANGE_ME
```

# starting
Use the following command to compile and then start the bot:
```bash
npm run tsc
npm run start
```

# development
Use the following command to run the bot with ts-node and automatically start when files in the source folder change:
```
npm run dev
```

# new cmd
1. Create a file in the "cmd" folder in the "src" folder.
   The file extension should be "<name>.cmd.ts".
2. Use the "registerCommand" function to register a new command in the global CmdManager created in the "index.js"
3. Check if the command get registered by starting the bot and check the "Loaded commands:" logs.

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