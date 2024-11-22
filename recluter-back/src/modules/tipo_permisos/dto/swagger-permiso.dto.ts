import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDate } from 'class-validator';

export class SwaggerPermisoDto {
  @ApiProperty({ example: 2})
  @IsInt()
  id: number;

  @ApiProperty({ example: 'seguridad23' })
  @IsString()
  tipo_usuario: string;

  @ApiProperty({ example: '2024-07-08T15:46:33.224Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:46:33.224Z' })
  @IsDate()
  updatedAt: Date;
}