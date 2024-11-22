import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt } from "class-validator";

export class SwaggerCountResponse {
    @ApiProperty({ description: 'Numero de registros insertados' })
    count: number;
}
export class SwaggerSkillUsuarioDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'soft_skill_id', example: [1,2,3]})
    @IsInt()
    soft_skill_id: number;

    @IsInt()
    @ApiProperty({ description: 'Porcentaje de la soft skill', example: 23})
    porcentaje: number;

    @IsInt()
    @ApiProperty({ description: 'Nivel de la soft skill', example: 2})
    nivel: number;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}

