import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class SwaggerDetalleKillerQuestionDto {
    @ApiProperty({ example: 699 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'ID de killer_question_id', example: 1 })
    @IsString()
    killer_question_id: number;

    @ApiProperty({ description: 'Indica el detalle', example: "detalles ..." })
    @IsString()
    detalle: string;

    @ApiProperty({ description: 'Indica si es true o false', example: true })
    @IsBoolean()
    correcto: boolean;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
