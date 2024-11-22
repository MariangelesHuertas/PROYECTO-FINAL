import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsEmail, IsEnum } from 'class-validator';

export class UpdateFieldSobreMi {
  @ApiProperty({
    description: 'nombre del usuario',
    example: "usuario1",
  })
  @IsOptional()
  @IsString()
  sobreMi?: string;
}