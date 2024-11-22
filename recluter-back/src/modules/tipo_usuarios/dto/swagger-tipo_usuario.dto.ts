import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDate } from 'class-validator';

export class SwaggerTipoUsuarioDto {
  @ApiProperty({ example: 113 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'seguridad' })
  @IsString()
  tipo_usuario: string;

  @ApiProperty({ example: '2024-07-08T15:58:34.991Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:58:34.991Z' })
  @IsDate()
  updatedAt: Date;
}