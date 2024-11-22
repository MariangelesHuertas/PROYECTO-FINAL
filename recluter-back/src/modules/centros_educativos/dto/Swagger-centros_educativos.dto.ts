import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsDate, IsString} from 'class-validator';

export class SwaggerCentrosEducativoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({description: 'Ingresa el centro educativo',example: "centro_educativo"})
  @IsString()
  centro_educativo: string;


  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  updatedAt: Date;
}