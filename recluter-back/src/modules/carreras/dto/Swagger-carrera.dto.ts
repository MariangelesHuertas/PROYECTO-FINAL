import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsDate, IsString} from 'class-validator';

export class SwaggerCarrerasDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({description: 'id de usuario_id',example: "carrera"})
  @IsString()
  carrera: string;


  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  updatedAt: Date;
}