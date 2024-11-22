import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class SwaggerAlertaDto {
    @ApiProperty({ example:1})
    @IsInt()
    id: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    tipo_alerta_id: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    usuario_id: number;

    @ApiProperty({ example: "nombre", })
    @IsString()
    nombre: string;

    @ApiProperty({ example: "cargo", })
    @IsString()
    cargo: string;

    @ApiProperty({ example: "temporalidad", })
    @IsString()
    temporalidad: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    activa: boolean;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
