import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TamanioEmpresa{

    @ApiProperty({ description: 'Desde cuántos empleados', example: 10 })
    @IsNumber()
    desde: number;

    @ApiProperty({ description: 'Hasta cuántos empleados', example: 50 }) 
    @IsNumber()
    hasta: number;
}
export class FilterEmpresaArray {


    @ApiProperty({ type: [Number], description: 'Array de valoraciones_empresas', example: [1 ,2,3] })
    @IsOptional()
    @IsNumber({},{ each: true })
    valoraciones_empresasArray?: number[];


    @ApiProperty({ type: [String], description: 'Array de palabras_clave', example: ['palabra1', 'palabra2', 'palabra3'] })
    @IsOptional()
    @IsString({ each: true })
    palabras_claveArray?: string[];

    @ApiProperty({ type: [String], description: 'Array de niveles sectores', example: ['sectores1', 'sectores2', 'sectores3'] })
    @IsOptional()
    @IsString({ each: true })
    sectoresArray?: string[];
    @ApiProperty({ type: [TamanioEmpresa], description: 'Array de tamaño de empresa', 
        example: [{ desde: 10, hasta: 50 }, { desde: 100, hasta: 500 }] })
    @IsOptional()
    @Type(() => TamanioEmpresa)
    tamanioArray?: TamanioEmpresa[];
}














