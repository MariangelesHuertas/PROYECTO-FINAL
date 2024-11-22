import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUsuarioDto } from 'src/modules/usuarios/dto/create-usuario.dto';

export class FilterCvGeneral {


    @ApiProperty({ type: [String], description: 'Array de aptitudes', example: ['aptitud1', 'aptitud2', 'aptitud3'] })
    @IsOptional()
    @IsString({ each: true })
    aptitudesArray?: string[];


    @ApiProperty({ type: [String], description: 'Array de centrosEducativos', example: ['centros_educativos1', 'centros_educativos2', 'centros_educativos3'] })
    @IsOptional()
    @IsString({ each: true })
    centrosEducativosArray?: string[];

    @ApiProperty({ type: [String], description: 'Array de niveles Idiomas', example: ['nivel_idioma1', 'nivel_idioma2', 'nivel_idioma3'] })
    @IsOptional()
    @IsString({ each: true })
    nivelIdiomaArray?: string[];

    @ApiProperty({ type: [String], description: 'Array de Idiomas', example: ['idiomas1', 'idiomas2', 'idiomas3'] })
    @IsOptional()
    @IsString({ each: true })
    idiomasArray?: string[];
}