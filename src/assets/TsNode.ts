import fs from "fs"
import json5 from "json5"
import path from "path"
import { Json, isJsonObject } from "./JSON"

export interface PackageJson {
    name: string,
    version: string,
    description: string,
    main: string,
    scripts: {
        [scriptName: string]: string
    },
    author: string,
    license: string,
    devDependencies: PackageJsonDependencies,
    dependencies: PackageJsonDependencies,
    [key: string]: Json
}

export interface PackageJsonDependencies {
    [depName: string]: string
}

export const isPackageJson = (value: any): value is PackageJson =>
    isJsonObject(value) &&
    typeof value.name == 'string' &&
    value.name.length > 0 &&
    typeof value.version == 'string' &&
    value.version.length > 0 &&
    typeof value.description == 'string' &&
    value.description.length > 0 &&
    typeof value.license == 'string' &&
    value.license.length > 0 &&
    typeof value.main == 'string' &&
    value.main.length > 0 &&
    typeof value.author == 'string' &&
    value.author.length > 0

export interface TsConfig {
    compilerOptions: CompilerOptions
    include: string[]
    exclude: string[]
}

export interface CompilerOptions {
    target: string
    module: string
    moduleResolution: string
    baseUrl: string
    outDir: string
    esModuleInterop: boolean
    forceConsistentCasingInFileNames: boolean
    strict: boolean
    skipLibCheck: boolean
    [options: string]: Json
}

export const isTsConfig = (value: any): value is TsConfig =>
    isJsonObject(value, 1) &&
    isJsonObject(value.compilerOptions) &&
    typeof value.compilerOptions == 'object' &&
    typeof value.compilerOptions.target == 'string' &&
    typeof value.compilerOptions.module == 'string' &&
    typeof value.compilerOptions.strict == 'boolean'

export let cachedIsTsNode: boolean | undefined
export let cachedRootPath: boolean | undefined
export const tsConfigPath = path.join(
    process.cwd(),
    'tsconfig.json'
)
export let cachedTsConfig: TsConfig | undefined
export const packageJsonPath = path.join(
    process.cwd(),
    'package.json'
)
export let cachedPackageJson: PackageJson | undefined
export let cachedModuleRootPath: string | undefined

export function isTsNode(): boolean {
    if (typeof cachedIsTsNode != "boolean") {
        cachedIsTsNode = process.argv.some(
            (arg) => arg.includes('ts-node')
        )
    }
    return cachedIsTsNode
}

export const getTsConfig = (): TsConfig => {
    if (cachedTsConfig) {
        return cachedTsConfig
    }
    const content = fs.readFileSync(
        tsConfigPath,
        'utf8'
    )
    const parsed = json5.parse(content)
    if (!isTsConfig(parsed)) {
        throw new Error("Loaded file from '" + tsConfigPath + "' is not a valid tsconfig.json")
    }
    return cachedTsConfig = parsed
}

export const getPackageJson = (): PackageJson => {
    if (cachedPackageJson) {
        return cachedPackageJson
    }
    const content = fs.readFileSync(
        packageJsonPath,
        'utf8'
    )
    const parsed = json5.parse(content)
    if (!isPackageJson(parsed)) {
        throw new Error("Loaded file from '" + packageJsonPath + "' is not a valid package.json")
    }
    return cachedPackageJson = parsed
}

export const getModuleRootPath = (
    ...subpaths: string[]
): string => {
    if (typeof cachedModuleRootPath != "string") {
        const tsConfig = getTsConfig()
        cachedModuleRootPath = path.join(
            process.cwd(),
            isTsNode() ?
                tsConfig.compilerOptions.baseUrl ?? "./" :
                tsConfig.compilerOptions.outDir ?? "./"
        )
    }
    if (subpaths.length == 0) {
        return cachedModuleRootPath
    }
    return path.join(
        cachedModuleRootPath,
        ...subpaths,
    )
}

export const universalRequire = (
    moduleSelector: string,
    baseDir?: string,
): any => {
    if (!moduleSelector.startsWith("/")) {
        if (baseDir) {
            if (baseDir.startsWith("/")) {
                moduleSelector = path.join(
                    baseDir,
                    moduleSelector
                )
            } else {
                moduleSelector = getModuleRootPath(
                    baseDir,
                    moduleSelector
                )
            }
        } else {
            moduleSelector = getModuleRootPath(moduleSelector)
        }
    }

    if (moduleSelector.endsWith(".json")) {
        return require(moduleSelector)
    }

    if (moduleSelector.endsWith(".js")) {
        throw new Error("Explicit '.js' file extension is not allowed in universalRequire: '" + moduleSelector + "'")
    } else if (moduleSelector.endsWith(".ts")) {
        throw new Error("Explicit '.ts' file extension is not allowed in universalRequire: '" + moduleSelector + "'")
    }

    if (isTsNode()) {
        return require(moduleSelector + ".ts")
    }
    return require(moduleSelector + ".ts")
}

let mainExtension: string
let allowedExtensions: string[]
if (isTsNode()) {
    mainExtension = "ts"
    allowedExtensions = [
        "ts",
        "tsx",
        "json"
    ]
} else {
    mainExtension = "js"
    allowedExtensions = [
        "js",
        "jsx",
        "json"
    ]
}

export const getAllowedExtensions =
    (): string[] => [...allowedExtensions]

export const getMainExtension =
    (): string => mainExtension

export const setMainExtension = (
    ext: string,
    errorIfNotAllowed: boolean = false
): void => {
    const origin = ext
    while (
        ext.startsWith(".") ||
        ext.startsWith(" ") ||
        ext.startsWith("-") ||
        ext.startsWith("_")
    ) {
        ext = ext.substring(1)
    }
    while (
        ext.endsWith(".") ||
        ext.endsWith(" ") ||
        ext.endsWith("-") ||
        ext.endsWith("_")
    ) {
        ext = ext.slice(0, -1)
    }
    if (ext.length == 0) {
        throw new Error(
            "Invalid extension '" + origin + "'"
        )
    }
    if (!allowedExtensions.includes(ext)) {
        if (errorIfNotAllowed) {
            throw new Error(
                "Extension '" + origin + "' is not allowed"
            )
        }
        allowedExtensions.push(ext)
    }
    mainExtension = ext
}

export const allowExtensions = (
    extensions: string[],
    errorOnAlreadyAllowed: boolean = true,
) => {
    if (extensions.length == 0) {
        throw new Error("No extensions specified")
    }
    extensions = extensions.map(
        (ext) => {
            const origin = ext
            while (
                ext.startsWith(".") ||
                ext.startsWith(" ") ||
                ext.startsWith("-") ||
                ext.startsWith("_")
            ) {
                ext = ext.substring(1)
            }
            while (
                ext.endsWith(".") ||
                ext.endsWith(" ") ||
                ext.endsWith("-") ||
                ext.endsWith("_")
            ) {
                ext = ext.slice(0, -1)
            }
            if (ext.length == 0) {
                throw new Error(
                    "Invalid extension '" + origin + "'"
                )
            }
            return ext.toLowerCase()
        }
    )

    for (const extension of extensions) {
        if (allowedExtensions.includes(extension)) {
            if (errorOnAlreadyAllowed) {
                throw new Error(
                    "Extension '" + extension + "' is not allowed"
                )
            }
            continue
        }
        allowedExtensions.push(extension)
    }
}

export const disallowExtensions = (
    extensions: string[],
    errorOnNotAllowed: boolean = true,
) => {
    if (extensions.length == 0) {
        throw new Error("No extensions specified")
    }
    extensions = extensions.map(
        (ext) => {
            const origin = ext
            while (
                ext.startsWith(".") ||
                ext.startsWith(" ") ||
                ext.startsWith("-") ||
                ext.startsWith("_")
            ) {
                ext = ext.substring(1)
            }
            while (
                ext.endsWith(".") ||
                ext.endsWith(" ") ||
                ext.endsWith("-") ||
                ext.endsWith("_")
            ) {
                ext = ext.slice(0, -1)
            }
            if (ext.length == 0) {
                throw new Error(
                    "Invalid extension '" + origin + "'"
                )
            }
            return ext.toLowerCase()
        }
    )

    for (const extension of extensions) {
        if (!allowedExtensions.includes(extension)) {
            if (errorOnNotAllowed) {
                throw new Error(
                    "Extension '" + extension + "' is not allowed"
                )
            }
            continue
        }
    }
    allowedExtensions = allowedExtensions.filter(
        (value) => !extensions.includes(value)
    )
}