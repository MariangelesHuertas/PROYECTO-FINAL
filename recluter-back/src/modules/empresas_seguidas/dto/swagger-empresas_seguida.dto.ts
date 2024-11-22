import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class SwaggerEmpresasSeguidasDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'usuario_id', example: 1 })
    @IsInt()
    usuario_id: number;

    @ApiProperty({ description: 'empresa_id', example: 1 })
    @IsInt()
    empresa_id: string;

 

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
