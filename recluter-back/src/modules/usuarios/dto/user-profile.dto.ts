import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
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
    description: 'ingrese jornada',
    example: "jornada",
  })
  @IsOptional()
  @IsString()
  jornada?: string;


  @ApiProperty({
    description: 'ingrese modalidad',
    example: "modalidad",
  })
  @IsOptional()
  @IsString()
  modalidad?: string;

}
