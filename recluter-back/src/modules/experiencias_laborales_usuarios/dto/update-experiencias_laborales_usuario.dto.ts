import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsInt, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateExperienciasLaboralesUsuarioDto {

    @ApiProperty({
        description: 'inserta la empresa Id',
        example: 1,
    })

    @IsInt()
    @IsOptional()
    empresa_id?: number;


    @ApiProperty({description: 'id de sector_id',example: 1})
    @IsNumber()
    @IsOptional()
    sector_id?: number;

    @ApiProperty({
        description: 'inserta el nombre del sector',
        example: "sector1",
    })
    @IsString()
    @IsOptional()
    nombre_sector?: string;

    



    @ApiProperty({
        description: 'inserta el cargo',
        example: "2024-07-26T14:42:52.136Z",
    })
    @IsString()
    @IsOptional()
    cargo?: string;


    @ApiProperty({
        description: 'inserta la descripcion',
        example: "2024-07-26T14:42:52.136Z",
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        description: 'inserta el nombre de la empresa',
        example: "usuario1",
    })
    @IsString()
    @IsOptional()
    nombre_empresa?: string;

    @ApiProperty({
        description: 'ingresa la fecha de inicio',
        example: "usuario1",
    })
    @IsOptional()
    @IsDateString()
    fecha_inicio?: Date;

    @ApiProperty({
        description: 'ingresa la fecha de finalizacion',
        example: "2024-07-26T14:42:52.136Z",
    })
    @IsDateString()
    @IsOptional()
    fecha_fin?: Date;

    @ApiProperty({
        description: 'inserta el lugar de trabajo',
        example: "lugar de trabajo",
    })
    @IsString()
    @IsOptional()
    lugar_trabajo?: string;

}
