import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsDate, IsString} from 'class-validator';

export class SwaggerTiposEducacionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({description: 'id de usuario_id',example: "tipo_educacion"})
  @IsString()
  tipo_educacion: string;


  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  updatedAt: Date;
}