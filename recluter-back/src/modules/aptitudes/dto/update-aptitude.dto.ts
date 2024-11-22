import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAptitudeDto {
  
  @ApiProperty({
    example:"Trabajo en equipo",
  })
  @IsOptional()
  @IsString()
  aptitud?: string;

  @ApiProperty({
    example:true,
  })
  @IsOptional()
  @IsBoolean()
  aprobado?: boolean;
}