import { CacheType, ChatInputCommandInteraction, Events, Interaction, RequestData, SlashCommandBuilder } from 'discord.js'
import { promises as afs } from "fs"
import { DiscordEnv } from "../types"
import { getMainExtension, getModuleRootPath } from './TsNode'

export type CmdHandler = (
    interaction: ChatInputCommandInteraction<CacheType>
) => void

export interface CmdHolder {
    [cmdName: string]: {
        builder: SlashCommandBuilder,
        handle: CmdHandler
    }
}

let globalCmdManager: CmdManager | undefined
export const getGlobalglobalCmdManager = (): CmdManager => {
    if (!globalCmdManager) {
        throw new Error(
            'Try to get the global CmdManager, but there is no cmd manager initialized'
        )
    }
    return globalCmdManager
}

export const registerCommand = (
    builder: SlashCommandBuilder | any,
    handle: CmdHandler
): void => {
    getGlobalglobalCmdManager()
        .registerCommand(builder, handle)
}

export class CmdManager {
    private commands: CmdHolder = {}
    public cmdRootPath: string

    constructor(
        cmdRootPath?: string
    ) {
        if (!cmdRootPath) {
            cmdRootPath = "cmds"
        }
        this.cmdRootPath = getModuleRootPath(cmdRootPath)
        if (!globalCmdManager) {
            globalCmdManager = this
        }
    }

    clearRegisteredCommands(): void {
        this.commands = {}
    }

    getCommandsCount(): number {
        return Object.keys(this.commands).length
    }

    async loadCommands(
        allowMultipleCmdFiles: boolean = false,
        errorOnNoCommand: boolean = true
    ): Promise<void> {
        let files = await loadFilesRecursive(this.cmdRootPath)
        files = files.filter(
            (file) => file.endsWith(".cmd." + getMainExtension())
        )
        if (files.length == 0) {
            if (errorOnNoCommand) {
                throw new Error(
                    "No commands found in '" + this.cmdRootPath + "'"
                )
            }
            return
        }

        for (const file of files) {
            const expectedCmdsCount = this.getCommandsCount() + 1
            require(this.cmdRootPath + "/" + file)
            const cmdsCount = this.getCommandsCount()
            if (
                !allowMultipleCmdFiles &&
                expectedCmdsCount > cmdsCount
            ) {
                throw new Error(
                    "Its not allowed to define multiple commands in one file: " + file
                )
            } else if (
                expectedCmdsCount < cmdsCount
            ) {
                throw new Error(
                    "Command file '" + file + "' not registered a command"
                )
            }
        }
    }

    registerCommand(
        builder: SlashCommandBuilder | any,
        handle: CmdHandler
    ): void {
        if (!(builder instanceof SlashCommandBuilder)) {
            throw new TypeError("Command builder is not a SlashCommandBuilder")
        } else if (typeof handle != "function") {
            throw new TypeError("Command handle is not a function")
        } else if (builder.name != builder.name.toLowerCase()) {
            throw new Error("Command name is not in lowercase")
        } else if (builder.name.includes("-")) {
            throw new Error("Command name includes the following not allowed character '-'")
        } else if (builder.name.includes("_")) {
            throw new Error("Command name includes the following not allowed character '_'")
        } else if (builder.name.includes(" ")) {
            throw new Error("Command name includes the following not allowed character ' '")
        } else if (this.commands[builder.name]) {
            throw new Error("Command with name " + builder.name + " is already registered")
        }
        this.commands[builder.name] = {
            builder: builder,
            handle: handle
        }
    }

    createRestPutBody(): RequestData {
        return {
            body: Object.keys(this.commands).map(
                (cmdName) => this.commands[cmdName].builder.toJSON()
            )
        }
    }

    async applyCmds(env: DiscordEnv): Promise<string[]> {
        env.client.on(
            Events.InteractionCreate,
            async (
                interaction: Interaction<CacheType>
            ) => {
                if (!interaction.isChatInputCommand()) {
                    return
                }

                const cmd = this.commands[interaction.commandName]

                try {
                    if (!cmd) {
                        throw new Error("Command " + interaction.commandName + " is not registered")
                    }

                    await cmd.handle(interaction)
                } catch (err) {
                    console.error("Unknown error: ", err)
                    if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({
                            content: 'There was an error while executing this command!',
                            ephemeral: true
                        })
                    } else {
                        await interaction.reply({
                            content: 'There was an error while executing this command!',
                            ephemeral: true
                        })
                    }
                }
            }
        )

        env.rest.put(
            env.applicationGuildCommands,
            this.createRestPutBody()
        )

        return Object.keys(this.commands)
    }
}

export const loadFilesRecursive = async (
    rootDir: string,
    subpath?: string
) => {
    let result: string[] = []
    let files = await afs.readdir(
        subpath ?
            rootDir + "/" + subpath :
            rootDir
    )
    await Promise.all(
        files.map(async (file) => {
            const stat = await afs.stat(
                subpath ?
                    rootDir + "/" + subpath + "/" + file :
                    rootDir + "/" + file
            )
            if (stat.isDirectory()) {
                result.push(
                    ...await loadFilesRecursive(
                        rootDir,
                        subpath + "/" + file
                    )
                )
            } else if (stat.isFile()) {
                result.push(
                    subpath ?
                        subpath + "/" + file :
                        file
                )
            }
        })
    )
    return result
}






