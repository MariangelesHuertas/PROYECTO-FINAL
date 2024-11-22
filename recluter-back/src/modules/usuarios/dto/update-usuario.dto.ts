import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUsuarioDto {
  @ApiProperty({
    description: 'nombre del usuario',
    example: "usuario1",
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({
    description: 'apellido del usuario',
    example: "firstname",
  })
  @IsString()
  @IsOptional()
  apellido_paterno?: string;


  @ApiProperty({
    description: 'apellido del usuario',
    example: "lasttname",
  })
  @IsString()
  @IsOptional()
  apellido_materno?: string;


  @ApiProperty({
    description: 'nombre de usuario',
    example: "usario.123",
  })
  @IsString()
  @IsOptional()
  usuario?: string;


  @ApiProperty({
    description: 'inserta una contraseña , mayor a 6 carateres',
    example: "password",
  })
  @IsString()
  @IsOptional()
  contrasena?: string;

  @ApiProperty({
    description: 'inserta el tipo_usuario',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  tipo_usuario_id?: number = 1;



  @ApiProperty({
    description: 'url de la img',
    example: "http://",
  })
  @IsString()
  @IsOptional()
  imagen?: string;

  @ApiProperty({
    description: 'url de img banner',
    example: "http://",
  })
  @IsString()
  @IsOptional()
  imagen_banner?: string;

  @ApiProperty({
    description: 'cargo del usuario',
    example: "Desarrollador",
  })
  @IsString()
  @IsOptional()
  cargo?: string;

  @ApiProperty({
    description: 'ID del país del usuario',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  pais_id?: number;

}
