import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from 'class-validator';

export class SwaggerFasesPostulacionesDto {
    @ApiProperty({ example:1})
    @IsInt()
    id: number;

    @ApiProperty({ description: 'Indica la fase', example: "fase" })
    @IsString()
    fase: string;

    @ApiProperty({ description: 'Indica el id de la prioridad', example: 1 })
    @IsNumber()
    prioridad: number;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
