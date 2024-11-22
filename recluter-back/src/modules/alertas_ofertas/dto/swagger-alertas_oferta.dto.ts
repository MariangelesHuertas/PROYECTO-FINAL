import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class SwaggerAlertaOfertasDto {
    @ApiProperty({ example: 1})
    @IsInt()
    id: number;

    @ApiProperty({ description: 'Indica el nombre_tipo', example: 1 })
    @IsBoolean()
    alerta_id: number;

    @ApiProperty({ description: 'Indica el tipo', example: 1 })
    @IsBoolean()
    oferta_id: number;


    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}