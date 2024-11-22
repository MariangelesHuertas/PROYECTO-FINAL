import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsDate, IsNumber, IsEnum, IsString, IsOptional, IsDateString} from 'class-validator';

export class SwaggerAptitudesUsuarioDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({description: 'id de aptitud_id',example: 1})
  @IsNumber()
  @IsOptional()
  aptitud_id?: number;

  @ApiProperty({description: 'id de usuario_id',example: 1})
  @IsNumber()
  usuario_id: number;

 

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  updatedAt: Date;
}