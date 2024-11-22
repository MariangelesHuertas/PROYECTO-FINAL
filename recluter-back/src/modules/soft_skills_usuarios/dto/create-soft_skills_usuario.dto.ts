import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, ValidateNested, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SofSkill {
    @IsNumber()
    @ApiProperty({ description: 'ID de la soft skill', example: 1 })
    @IsOptional()
    id?: number;

    
    @IsString()
    @ApiProperty({ description: 'Nombre de la soft skill', example: "nombre"})
    @IsOptional()
    soft_skill?: string;

    @IsNumber()
    @ApiProperty({ description: 'Porcentaje de la soft skill', example: 23})
    @IsOptional()
    porcentaje?: number;

    @IsNumber()
    @ApiProperty({ description: 'Nivel de la soft skill', example: 5})
    nivel: number;
}

export class CreateSoftSkillsUsuarioDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SofSkill)
    @ApiProperty({ type: [SofSkill], description: 'Lista de soft skills con ID y porcentaje' ,   example: [
        { id: 1, porcentaje: 30, nivel: 3},
        { id: 2, porcentaje: 50, nivel: 5 },
        { id: 3, porcentaje: 70, nivel: 7 }
    ]})
    soft_skills: SofSkill[];
}