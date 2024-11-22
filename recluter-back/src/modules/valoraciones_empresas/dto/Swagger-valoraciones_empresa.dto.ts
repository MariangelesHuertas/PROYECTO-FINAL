import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsDate, IsNumber, IsEnum, IsString} from 'class-validator';

export class SwaggerValoracionEmpresaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({description: 'id de empresa_id',example: 1})
  @IsNumber()
  empresa_id: number;

  @ApiProperty({description: 'id de usuario_id',example: 1})
  @IsNumber()
  usuario_id: number;

  @ApiProperty({description: 'Ingresa la valoracion del 1 al 9',example: 1})
  @IsNumber()
  @IsEnum([1,2,3,4,5,6,7,8,9])
  valoracion: number;

  @ApiProperty({description: 'Ingresa una observacion',example: "observacion"})
  @IsString()
  observacion: number;


  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  updatedAt: Date;
}