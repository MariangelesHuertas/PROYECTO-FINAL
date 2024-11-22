import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsEmail, IsEnum } from 'class-validator';

export class updateFieldJornadaModalidad {
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