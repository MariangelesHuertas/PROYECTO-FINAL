import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class SwaggerAptitudeDto {
    @ApiProperty({ example: 699 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'Nombre de la aptitud', example: 'Trabajo en equipo' })
    @IsString()
    aptitud: string;

    @ApiProperty({ description: 'Indica si la aptitud está aprobada', example: true })
    @IsBoolean()
    aprobado: boolean;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
