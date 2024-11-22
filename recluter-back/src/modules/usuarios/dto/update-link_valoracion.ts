import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsEmail, IsEnum } from 'class-validator';

export class updateFieldLinkValoracion {
  @ApiProperty({
    description: 'campo link de valoracion',
    example: "link de valoracion",
  })
  @IsOptional()
  @IsString()
  link_valoracion?: string;
}