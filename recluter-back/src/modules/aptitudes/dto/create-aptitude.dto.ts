import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateAptitudeDto {

  @ApiProperty({
    example:"Trabajo en equipo",
  })
  @IsString()
  aptitud: string;
  @ApiProperty({
    example:true,
  })
  @IsBoolean()
  aprobado: boolean;
}
