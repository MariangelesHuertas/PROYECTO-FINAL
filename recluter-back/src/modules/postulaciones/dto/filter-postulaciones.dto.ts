import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AniosExperiencia{

    @ApiProperty({ description: 'Desde cuántos empleados', example: 1})
    @IsNumber()
    desde: number;

    @ApiProperty({ description: 'Hasta cuántos empleados', example: 5 }) 
    @IsNumber()
    hasta: number;
}
export class FilterOferta {

    
    @ApiProperty({ type: [Number], description: 'Array de valoraciones_empresas', example: [1 ,2,3] })
    @IsOptional()
    @IsNumber({},{ each: true })
    valoraciones_empresasArray?: number[];

    @ApiProperty({ type: [String], description: 'Array de filtro de educacion', example: ['tipo_educacion', 'tipo_educacion', 'tipo_educacion'] })
    @IsOptional()
    @IsString({ each: true })
    tipo_educacionArray?: string[];

    @ApiProperty({ type: [AniosExperiencia], description: 'Array de anios de experiencia', 
        example: [{ desde: 1, hasta: 2 }, { desde: 5, hasta: 7 }] })
    @IsOptional()
    @Type(() => AniosExperiencia)
    anios_experienciaArray?: AniosExperiencia[];
}
