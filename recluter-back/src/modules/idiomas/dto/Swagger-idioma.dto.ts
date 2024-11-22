import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class SwaggerIdiomaDto {
    @ApiProperty({ example:1})
    @IsInt()
    id: number;

    @ApiProperty({ description: 'Indica el idioma', example: "ingles" })
    @IsBoolean()
    idioma: string;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
