import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDate } from 'class-validator';

export class SwaggerTipoPermisoDto {
  @ApiProperty({ example: 699 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 99 })
  @IsInt()
  tipo_permiso_id: number;

  @ApiProperty({ example: 'hola-slug' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'este tipo de permisos estan a cargo....' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  updatedAt: Date;
}