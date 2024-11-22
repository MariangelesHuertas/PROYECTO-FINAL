export interface portafolioUsuarioInterface {
    nombre: string;
    nombre_archivo: string;
    portafolio: string;
    descripcion: string;
    titulo: string;
    url: string;
    titulo1: string; // Título del archivo 1
    titulo2: string; // Título del archivo 2
    titulo3: string; // Título del archivo 3
    archivoFile1?: Express.Multer.File; // Archivo 1
    archivoFile2?: Express.Multer.File; // Archivo 2
    archivoFile3?: Express.Multer.File; // Archivo 3
}
