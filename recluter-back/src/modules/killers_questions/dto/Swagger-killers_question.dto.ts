import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from 'class-validator';

export class SwaggerKillerQuestionDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'ID de la oferta', example: 1 })
    @IsNumber()
    oferta_id: number;

    @ApiProperty({ description: 'ID de tipo_pregunta_id', example:1 })
    @IsNumber()
    tipo_pregunta_id: number;

    @ApiProperty({ description: 'Indica la pregunta', example:"pregunta .." })
    @IsString()
    pregunta: string;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
