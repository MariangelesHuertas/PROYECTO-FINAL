import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class SwaggerSoftSkillsDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'Ingresa el soft_skill', example: "aprendizaje" })
    @IsString()
    soft_skill: string;

    @ApiProperty({ description: 'estado de la skill', example: true })
    @IsBoolean()
    aprobado: boolean;

}
