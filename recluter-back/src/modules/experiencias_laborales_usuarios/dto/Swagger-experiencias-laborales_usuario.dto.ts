import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsDate, IsNumber, IsEnum, IsString, IsOptional, IsDateString} from 'class-validator';

export class SwaggerExperienciaLaboralesUsuariDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({description: 'id de usuario_id',example: 1})
  @IsNumber()
  @IsOptional()
  empresa_id?: number;
/* 
  @ApiProperty({description: 'id de usuario_id',example: 1})
  @IsNumber()
  usuario_id: number;
 */

  
  @ApiProperty({description: 'id de sector_id',example: 1})
  @IsNumber()
  sector_id?: number;

    
  @ApiProperty({description: 'Indica el nombre del sector',example: "cargo"})
  @IsString()
  nombre_sector: String;
  
  @ApiProperty({description: 'Indica el cargo',example: "cargo"})
  @IsString()
  cargo: String;

  @ApiProperty({description: 'Indica la descripcion',example: "descripcion"})
  @IsString()
  descripcion: String;

  @ApiProperty({description: 'Indica la nombre_empresa',example: "nombre_empresa"})
  @IsString()
  @IsOptional()
  nombre_empresa?: String;

  @ApiProperty({description: 'Indica la fecha_inicio',example: "2024-07-26T14:42:52.136Z"})
  @IsDateString()
  fecha_inicio: Date;

  @ApiProperty({description: 'Indica la fecha_fin',example: "2024-07-26T14:42:52.136Z"})
  @IsDateString()
  fecha_fin: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  updatedAt: Date;
}