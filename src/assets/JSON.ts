
export type JsonPrimitive = string | number | boolean | null | undefined
export type JsonHolder = JsonObject | JsonArray
export type JsonArray = Json[]
export type JsonObject = {
    [key: string]: Json
}

export type Json = JsonHolder | JsonArray | JsonPrimitive

export function isJsonType(value: any): value is JsonPrimitive {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null ||
        value === undefined
    )
}

export function isDefinedJsonType(value: any): value is JsonPrimitive {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null
    )
}

export function isJsonHolder(
    value: any,
    checkLevel: number = -1
): value is JsonHolder {
    return isJsonArray(
        value, checkLevel
    ) || isJsonObject(
        value, checkLevel
    )
}

export function isJsonArray(
    value: any,
    checkLevel: number = -1
): value is JsonArray {
    return Array.isArray(value) && (
        checkLevel == 0 ||
        value.every(
            (value) => isJson(
                value,
                checkLevel > -1 ?
                    checkLevel - 1 :
                    undefined
            )
        )
    )
}

export function isJsonObject(
    value: any,
    checkLevel: number = -1
): value is JsonObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        (
            checkLevel == 0 ||
            Object.keys(value).every(
                (key) => isJson(
                    value[key],
                    checkLevel > -1 ?
                        checkLevel - 1 :
                        undefined
                )
            )
        )
    )
}

export function isJson(
    value: any,
    checkLevel: number = -1
): value is Json {
    return (
        isDefinedJsonType(value) ||
        isJsonHolder(value, checkLevel) ||
        typeof value === 'undefined'
    )
}