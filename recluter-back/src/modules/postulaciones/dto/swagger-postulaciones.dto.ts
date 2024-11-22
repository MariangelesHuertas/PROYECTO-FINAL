import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsDate} from 'class-validator';

export class SwaggerPostulacioneDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

/*   @ApiProperty({description: 'id de usuario_id',example: 1})
  @IsInt()
  usuario_id: number; */
  
  @ApiProperty({description: 'id de oferta_id',example: 1})
  @IsInt()
  oferta_id: number;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  updatedAt: Date;
}