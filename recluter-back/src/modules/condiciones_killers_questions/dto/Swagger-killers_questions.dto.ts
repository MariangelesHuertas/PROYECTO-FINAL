import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from 'class-validator';

export class SwaggerCondicionKillerQuestionsDto {
    @ApiProperty({ example: 699 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'ID del killer_question_id', example: 1 })
    @IsString()
    killer_question_id: number;

    @ApiProperty({ description: 'Indica el minimo valor', example:1 })
    @IsNumber()
    minimo: number;

    @ApiProperty({ description: 'Indica el maximo valor', example:2 })
    @IsNumber()
    maximo: number;

    @ApiProperty({ description: 'Indica el maximo valor', example:"valor" })
    @IsString()
    valor: string;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
