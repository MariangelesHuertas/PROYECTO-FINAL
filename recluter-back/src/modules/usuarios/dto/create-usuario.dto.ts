import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsEmail, IsEnum } from 'class-validator';

export class CreateUsuarioDto {

  @ApiProperty({
    description: 'nombre del usuario',
    example: "usuario1",
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'apellido del usuario',
    example: "firstname",
  })
  @IsString()
  apellido_paterno: string;


  @ApiProperty({
    description: 'apellido del usuario',
    example: "lasttname",
  })
  @IsString()
  apellido_materno: string;

  @ApiProperty({
    description: 'nombre de usuario',
    example: "usario.123",
  })
  @IsString()
  usuario: string;

  @ApiProperty({
    description: 'email del usuario',
    example: "usuario@gmail.com",
  })
  @IsString()
  @IsEmail()
  email: string;


  @ApiProperty({
    description: 'inserta una contraseña , mayor a 6 carateres',
    example: "password",
  })
  @IsString()
  contrasena: string;


  /*   @ApiProperty({
      description: 'estado del usuario',
      example: "confirmacion",
    })
    @IsString()
    @IsEnum(["activo" , "desactivo" , "confirmar"])
    estado: string; */

  @ApiProperty({
    description: 'inserta el tipo_usuario',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  tipo_usuario_id;

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
