import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SofSkill {
    @IsNumber()
    @ApiProperty({ description: 'ID de la soft skill', example: 1 })
    id: number;

    @IsNumber()
    @ApiProperty({ description: 'Porcentaje de la soft skill', example: 23})
    porcentaje: number;
}

export class CreateSoftSkillsOfertaDto {
    @IsNumber()
    @ApiProperty({ description: 'ID de la oferta', example: 1})
    oferta_id: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SofSkill)
    @ApiProperty({ type: [SofSkill], description: 'Lista de soft skills con ID y porcentaje' ,   example: [
        { id: 1, porcentaje: 23 },
        { id: 2, porcentaje: 50 },
        { id: 3, porcentaje: 75 }
    ]})
    soft_skill_id: SofSkill[];
}