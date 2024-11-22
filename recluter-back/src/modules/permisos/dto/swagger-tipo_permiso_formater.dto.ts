import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SwaggerPermisoDto {
  @ApiProperty({ example: 657 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'este tipo de permisos estan a cargo....' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 'hola-slug' })
  @IsString()
  slug: string;
}

export class swaggerTipoPermisoFormatDto {
  @ApiProperty({ example: 97 })
  @IsInt()
  id_tipo_permiso: number;

  @ApiProperty({ example: 'carcer' })
  @IsString()
  tipo_permiso: string;

  @ApiProperty({ type: [SwaggerPermisoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SwaggerPermisoDto)
  permisos: SwaggerPermisoDto[];
}
