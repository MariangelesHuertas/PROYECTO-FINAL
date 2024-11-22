import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsDate, IsString, IsOptional, IsDateString} from 'class-validator';

export class SwaggerCentrosEducativoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({type:Number, description:"ID de tipo_educacion_id" , example:1 })
  @IsInt()
  tipo_educacion_id: Number;

  
  @ApiProperty({description:"ID de centro_educativo_id" , example:1})
  @IsInt()
  @IsOptional()
  centro_educativo_id?: Number;

  
  @ApiProperty({description:"ID de usuario_id" , example:1})
  @IsInt()
  usuario_id: Number;

  
  @ApiProperty({description:"ID de carrera_id" , example:1})
  @IsInt()
  @IsOptional()
  carrera_id?: Number;


  @IsDateString()
  fecha_inicio: Date;

  @IsDateString()
  fecha_final: Date;

  @ApiProperty({description:"Ingrese -  especialidad" , example:"especialidad"})
  @IsOptional()
  @IsString()
  especialidad?: string;

  @ApiProperty({description:"Ingrese -  nombre_centro_educativo" , example:"nombre_centro_educativo"})
  @IsString()
  nombre_centro_educativo: String;

  @ApiProperty({description:"Ingrese -  carrera" , example:"carrera"})
  @IsString()
  carrera: String;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
  @IsDate()
  updatedAt: Date;
}