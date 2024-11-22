import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";



export class CreateSoftSkillsPortafolioDto {
    @IsArray()
    @IsNumber({}, { each: true })
    @Type(() => Number)
    @ApiProperty({ description: 'Ingresa los soft_skill_id', example: [1, 2, 3] })
    soft_skill_id: number[];

    @IsNumber()
    @ApiProperty({ description: 'ingresa el portafolio_usuario_id', example: 1 })
    portafolio_usuario_id: number;
}
