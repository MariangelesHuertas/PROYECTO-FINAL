import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreatePermisoDto {

    @ApiProperty({
        description: 'id de Tipo_Permiso',
        example: 1,
    })
    @IsInt()
    tipo_permiso_id: number;
    
    @ApiProperty({
        description: 'inserta el Slug',
        example: 'hola-slug',
    })
    @IsString()
    slug: string;

    @ApiProperty({
        description: 'inserta una ruta',
        example: '/api/permiso',
    })
    @IsString()
    ruta: string;

    @ApiProperty({
        description: 'inserta una descripcion',
        example: 'este tipo de permisos estan a cargo....',
    })
    @IsString()
    descripcion: string;
}

