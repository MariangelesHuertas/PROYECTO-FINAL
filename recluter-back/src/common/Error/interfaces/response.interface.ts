// utils/responseFormatter.ts

export interface ResponseFormat {
    respuesta: boolean;
    mensaje: string;
    data: any[];
    mensaje_dev: string;
    meta: any[];
}
export interface ResponseObjectFormat {
    respuesta: boolean;
    mensaje: string;
    data: object;
    mensaje_dev: string;
    meta: any[];
}

export const formatResponseMessages = (
    respuesta: boolean,
    mensaje: string,
    data: any[] = [],
    mensaje_dev: string | null = null,
    meta: any = {},
): ResponseFormat => {
    return {
        respuesta,
        mensaje,
        data,
        mensaje_dev,
        meta
    };
};

export const formatResponseObjectMessages = (
    respuesta: boolean,
    mensaje: string,
    data: object = {},
    mensaje_dev: string | null = null,
    meta: any = {},
): ResponseObjectFormat => {
    return {
        respuesta,
        mensaje,
        data,
        mensaje_dev,
        meta
    };
};

