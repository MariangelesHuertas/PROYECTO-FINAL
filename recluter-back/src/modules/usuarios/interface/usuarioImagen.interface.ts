export enum TipoImagen {
    IMAGEN = 'IMAGEN',
    IMAGEN_BANNER = 'IMAGEN_BANNER'
}

export interface UsuarioImagen {
    nombre: string;
    descripcion: TipoImagen;
    archivo: Express.Multer.File;
}
export interface UsuarioImagenBanner {
    nombre: string;
    descripcion: TipoImagen;
    archivo: Express.Multer.File;
}