import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class SwaggerEmpresasDto {
    @ApiProperty({ example: 699 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'ID del Usuario', example: 1 })
    @IsString()
    usuario_id: number;

    @ApiProperty({ description: 'Indica el nombre de la Empresa', example: "Amazon" })
    @IsBoolean()
    empresa: boolean;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
