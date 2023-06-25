export type SomeType = JsType | JsonType | OopType

export type StringType = "STRING" |
    "OBJECT" |
    "BIGINT" |
    "NUMBER" |
    "UNDEFINED" |
    "FUNCTION" |
    "BOOLEAN" |
    "SYMBOL" |
    "UNKNOWN" |
    "ARRAY" |
    "NULL" |
    "LAMBDA" |
    "INSTANCE" |
    "CLASS" |
    "UNKNOWN TYPE ID"

export function typeToString(
    type: SomeType
): StringType {
    switch (type) {
        case OopType.STRING:
            return "STRING"
        case OopType.OBJECT:
            return "OBJECT"
        case OopType.NUMBER:
            return "NUMBER"
        case OopType.UNDEFINED:
            return "UNDEFINED"
        case OopType.FUNCTION:
            return "FUNCTION"
        case OopType.BOOLEAN:
            return "BOOLEAN"
        case OopType.SYMBOL:
            return "SYMBOL"
        case OopType.BIGINT:
            return "BIGINT"
        case OopType.ARRAY:
            return "ARRAY"
        case OopType.NULL:
            return "NULL"
        case OopType.CLASS:
            return "CLASS"
        case OopType.INSTANCE:
            return "INSTANCE"
        case OopType.LAMBDA:
            return "LAMBDA"
        default:
            return "UNKNOWN TYPE ID"
    }
}

export enum JsType {
    STRING,
    OBJECT,
    NUMBER,
    UNDEFINED,
    FUNCTION,
    BOOLEAN,
    SYMBOL,
    BIGINT,
    UNKNOWN,
}

export function getJsType(value: any): JsType {
    switch (typeof value) {
        case "string":
            return JsType.STRING
        case "object":
            return JsType.OBJECT
        case "function":
            return JsType.FUNCTION
        case "number":
            return JsType.NUMBER

        case "undefined":
            return JsType.UNDEFINED
        case "boolean":
            return JsType.BOOLEAN
        case "symbol":
            return JsType.SYMBOL
        case "bigint":
            return JsType.BIGINT
        default:
            return JsType.UNKNOWN
    }
}

export enum JsonType {
    STRING,
    OBJECT,
    NUMBER,
    UNDEFINED,
    FUNCTION,
    BOOLEAN,
    SYMBOL,
    BIGINT,
    UNKNOWN,

    ARRAY,
    NULL,
}

export function getJsonType(value: any): JsonType {
    switch (typeof value) {
        case "string":
            return JsonType.STRING
        case "object":
            if (value == null) {
                return JsonType.NULL
            } else if (Array.isArray(value)) {
                return JsonType.ARRAY
            }
            return JsonType.OBJECT
        case "function":
            return JsonType.FUNCTION
        case "number":
            return JsonType.NUMBER
        case "undefined":
            return JsonType.UNDEFINED
        case "boolean":
            return JsonType.BOOLEAN
        case "symbol":
            return JsonType.SYMBOL
        case "bigint":
            return JsonType.BIGINT
        default:
            return JsonType.UNKNOWN
    }
}

export enum OopType {
    STRING,
    OBJECT,
    BIGINT,
    NUMBER,
    UNDEFINED,
    FUNCTION,
    BOOLEAN,
    SYMBOL,
    UNKNOWN,

    ARRAY,
    NULL,

    INSTANCE,
    LAMBDA,
    CLASS,
}

export function getOopType(value: any): OopType {
    switch (typeof value) {
        case "string":
            return OopType.STRING
        case "object":
            if (value == null) {
                return OopType.NULL
            } else if (Array.isArray(value)) {
                return OopType.ARRAY
            } else if (
                getOopType(value.constructor) ==
                OopType.CLASS
            ) {
                return OopType.INSTANCE
            }
            return OopType.OBJECT
        case "number":
            return OopType.NUMBER
        case "undefined":
            return OopType.UNDEFINED
        case "function":
            if (!value.prototype) {
                return OopType.LAMBDA
            } else if (
                value.toString().slice(0, 5) ==
                ("class")
            ) {
                return OopType.CLASS
            }
            return OopType.FUNCTION
        case "boolean":
            return OopType.BOOLEAN
        case "symbol":
            return OopType.SYMBOL
        case "bigint":
            return OopType.BIGINT
        default:
            return OopType.UNKNOWN
    }
}

export type Lambda = ((...params: any[]) => any)
export type ClassConstructor =
    ObjectConstructor &
    (typeof Object)
export type Func = Function & ClassConstructor & Lambda

export const isOopString = (
    value: any
): value is string => getOopType(value) == OopType.STRING
export const isOopObject = (
    value: any
): value is AnyObject => getOopType(value) == OopType.OBJECT
export const isOopBigInt = (
    value: any
): value is bigint => getOopType(value) == OopType.BIGINT
export const isOopNumber = (
    value: any
): value is number => getOopType(value) == OopType.NUMBER
export const isOopFunction = (
    value: any
): value is Func => getOopType(value) == OopType.CLASS
export const isOopBoolean = (
    value: any
): value is boolean => getOopType(value) == OopType.BOOLEAN
export const isOopSymbol = (
    value: any
): value is symbol => getOopType(value) == OopType.SYMBOL
export const isOopUnknown = (
    value: any
): value is unknown => getOopType(value) == OopType.UNKNOWN
export const isOopArray = (
    value: any
): value is any[] => getOopType(value) == OopType.ARRAY
export const isOopInstance = (
    value: any
): value is AnyInstance => getOopType(value) == OopType.INSTANCE
export const isOopLambda = (
    value: any
): value is Lambda => getOopType(value) == OopType.LAMBDA
export const isOopClass = (
    value: any
): value is ClassConstructor => getOopType(value) == OopType.CLASS

export const castOopString = (
    value: any,
    type: OopType,
): value is string => type == OopType.STRING
export const castOopObject = (
    value: any,
    type: OopType,
): value is AnyObject => type == OopType.OBJECT
export const castOopBigInt = (
    value: any,
    type: OopType,
): value is bigint => type == OopType.BIGINT
export const castOopNumber = (
    value: any,
    type: OopType,
): value is number => type == OopType.NUMBER
export const castOopFunction = (
    value: any,
    type: OopType,
): value is Func => type == OopType.CLASS
export const castOopBoolean = (
    value: any,
    type: OopType,
): value is boolean => type == OopType.BOOLEAN
export const castOopSymbol = (
    value: any,
    type: OopType,
): value is symbol => type == OopType.SYMBOL
export const castOopUnknown = (
    value: any,
    type: OopType,
): value is unknown => type == OopType.UNKNOWN
export const castOopArray = (
    value: any,
    type: OopType,
): value is any[] => type == OopType.ARRAY
export const castOopInstance = (
    value: any,
    type: OopType,
): value is AnyInstance => type == OopType.INSTANCE
export const castOopLambda = (
    value: any,
    type: OopType,
): value is Lambda => type == OopType.LAMBDA
export const castOopClass = (
    value: any,
    type: OopType,
): value is ClassConstructor => type == OopType.CLASS

export interface JsInstanceDef {
    type: OopType.INSTANCE,
    default?: MultiJsTypeDef,
    values: {
        [key: string]: MultiJsTypeDef
    }
}
export interface JsArrayDef {
    type: OopType.ARRAY,
    types: JsTypeDef[],
}
export interface JsObjectDef {
    type: OopType.OBJECT,
    default?: MultiJsTypeDef,
    values: {
        [key: string]: MultiJsTypeDef
    }
}

export interface JsRefDef {
    type: OopType.CLASS | OopType.OBJECT | OopType.ARRAY | OopType.INSTANCE,
    id: number,
}
export type JsTypeDef =
    JsObjectDef |
    JsArrayDef |
    JsInstanceDef |
    JsRefDef |
    OopType.STRING |
    OopType.BIGINT |
    OopType.NUMBER |
    OopType.UNDEFINED |
    OopType.FUNCTION |
    OopType.BOOLEAN |
    OopType.SYMBOL |
    OopType.UNKNOWN |
    OopType.NULL |
    OopType.LAMBDA |
    OopType.CLASS

export type MultiJsTypeDef = JsTypeDef | JsTypeDef[]


export interface GenObject<T> {
    [key: string]: T
}
export interface AnyObject {
    [key: string]: any
}
export interface AnyInstance extends Object {
    constructor: ClassConstructor
    prototype?: AnyInstance,
    [key: string]: any
}
export type AnyArray = any[]

export interface TypeDefinition {
    refs: TypeReferences,
    def: JsTypeDef,
}

export function toStringJsType(
    def: JsTypeDef
): AnyObject | string {
    let ret: AnyObject | string | number = def
    if (typeof ret == "object") {
        ret.type = typeToString(ret.type)
        if (typeof ret.id != "number") {
            if (ret.type == OopType.ARRAY) {
                ret.types = ret.types.map(
                    (v: any) => typeToString(v)
                )
            } else {
                for (const key of Object.keys(ret.values)) {
                    ret.values[key] = typeToString(ret.values[key])
                }
            }
        }
    } else {
        ret = typeToString(ret)
    }
    return ret
}

export function toStringTypeDef(
    def: TypeDefinition
): {
    refs: AnyObject,
    def: AnyObject | string,
} {
    const objects: any = {}
    for (let i = 0; i < def.refs.objects.length; i++) {
        objects["" + i] = toStringJsType(def.refs.objects[i])
    }
    const arrays: any = {}
    for (let i = 0; i < def.refs.arrays.length; i++) {
        arrays["" + i] = toStringJsType(def.refs.arrays[i])
    }
    const instances: any = {}
    for (let i = 0; i < def.refs.instances.length; i++) {
        instances["" + i] = toStringJsType(def.refs.instances[i])
    }

    const ret: {
        refs: AnyObject,
        def: AnyObject | string | number,
    } = {
        refs: {
            class: def.refs.class,
            objects,
            arrays,
            instances,
        },
        def: toStringJsType(def.def),
    }

    return ret as any
}

export interface TypeReferences {
    class: string[],
    objects: JsObjectDef[],
    arrays: JsArrayDef[],
    instances: JsInstanceDef[],
}

export function getType(
    value: any,
    refs: TypeReferences = {
        class: [],
        objects: [],
        arrays: [],
        instances: [],
    },
): TypeDefinition {
    const type = getOopType(value)
    let def: JsTypeDef
    let i: number
    switch (type) {
        case OopType.OBJECT:
            i = refs.objects.indexOf(value)
            if (i == -1) {
                i = refs.objects.length
                const values: {
                    [key: string]: JsTypeDef
                } = {}
                for (const value2 of Object.keys(value)) {
                    values[value2] = getType(
                        value2,
                        refs,
                    ).def
                }
                refs.objects.push({
                    type: type as OopType.OBJECT,
                    values: values
                })
            }
            def = {
                type: type as OopType.OBJECT,
                id: i
            }
            break;
        case OopType.INSTANCE:
            i = refs.instances.indexOf(value)
            if (i == -1) {
                i = refs.instances.length
                const values: {
                    [key: string]: JsTypeDef
                } = {}
                for (const value2 of Object.keys(value)) {
                    values[value2] = getType(
                        value2,
                        refs,
                    ).def
                }
                refs.instances.push({
                    type: type as OopType.INSTANCE,
                    values: values
                })
            }
            def = {
                type: type as OopType.INSTANCE,
                id: i
            }
            break;
        case OopType.ARRAY:
            i = refs.arrays.indexOf(value)
            if (i == -1) {
                i = refs.arrays.length
                const types: JsTypeDef[] = (
                    value as any[]
                ).map(
                    (v) => getType(
                        v,
                        refs,
                    ).def
                )
                refs.arrays.push({
                    type: type as OopType.ARRAY,
                    types: types
                })
            }
            def = {
                type: type as OopType.ARRAY,
                id: i
            }
            break;
        default:
            def = type
    }
    return {
        refs,
        def,
    }
}

export function arrayToObject<T>(
    arr: T[]
): GenObject<T> {
    const ret: GenObject<T> = {}
    for (let i = 0; i < arr.length; i++) {
        ret["" + i] = arr[i]
    }
    return ret
}