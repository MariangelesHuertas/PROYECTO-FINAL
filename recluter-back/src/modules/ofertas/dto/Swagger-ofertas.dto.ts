import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNumber, IsString } from "class-validator";

export class SwaggerOfertasDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;

 /*    @ApiProperty({ description: 'Ingresa el id de la empresa', example: 1 })
    @IsInt()
    empresa_id: number;
 */
    @ApiProperty({ description: 'Ingresa el id del sector', example: 1 })
    @IsInt()
    sector_id: number;
    

    @ApiProperty({ description: 'Ingrese el Cargo', example: "cargo" })
    @IsString()
    cargo: string;

   
    @ApiProperty({ description: 'Ingrese la descripción', example: "descripcion" })
    @IsString()
    descripcion: string;

    @ApiProperty({ description: 'Ingrese el tipo', example: "tipo" })
    @IsString()
    tipo: string;

    @ApiProperty({ description: 'Ingrese la provincia', example: "provincia" })
    @IsString()
    ubi_provincia: string;

    @ApiProperty({ description: 'Ingrese la población', example: "poblacion" })
    @IsString()
    ubi_poblacion: string;

    @ApiProperty({ description: 'Ingrese el salario mínimo', example: 1000 })
    @IsNumber()
    sal_min: number;

    @ApiProperty({ description: 'Ingrese el salario máximo', example: 2000 })
    @IsNumber()
    sal_max: number;

    @ApiProperty({ description: 'Ingrese el abanico salarial', example: "abanico salarial" })
    @IsString()
    abanico_salarial: string;

    @ApiProperty({ description: 'Ingrese los años de experiencia', example: 3 })
    @IsInt()
    anios_experiencia: number;

    @ApiProperty({ description: 'Ingrese los estudios mínimos', example: "estudios minimos" })
    @IsString()
    estudios_minimos: string;

    @ApiProperty({ description: 'Ingrese el tipo de contrato', example: "tipo de contrato" })
    @IsString()
    tipo_contrato: string;

    @ApiProperty({ description: 'Ingrese la jornada laboral', example: "jornada laboral" })
    @IsString()
    jornada_laboral: string;
    //--------------------------------------------------------------------

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;

}
