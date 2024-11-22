import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsEmail, IsEnum } from 'class-validator';

export class CreateCsvUsuarioDto {




  @ApiProperty({
    description: 'nnombre',
    example: "nombre",
  })
  @IsString()
  nombre: string;


}