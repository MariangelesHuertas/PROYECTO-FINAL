import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";


export class UpdateEducacionUsuarioDto {
      @ApiProperty({type:Number, description:"ID de tipo_educacion_id" , example:1 })
      @IsInt()
      @IsOptional()
      tipo_educacion_id?: number;

      
      @ApiProperty({description:"ID de centro_educativo_id" , example:1})
      @IsInt()
      @IsOptional()
      centro_educativo_id?: number;

      
/*       @ApiProperty({description:"ID de usuario_id" , example:1})
      @IsInt()
      @IsOptional()
      usuario_id?: number; */

      
      @ApiProperty({description:"ID de carrera_id" , example:1})
      @IsInt()
      @IsOptional()
      carrera_id?: number;


      @IsDateString()
      @IsOptional()
      fecha_inicio?: Date;
    
      @IsDateString()
      @IsOptional()
      fecha_final?: Date;

      @ApiProperty({description:"Ingrese - nombre_centro_educativo" , example:"nombre_centro_educativo"})
      @IsString()
      @IsOptional()
      nombre_centro_educativo?: string;

      @ApiProperty({description:"Ingrese -  carrera" , example:"carrera"})
      @IsString()
      @IsOptional()
      carrera?: string;
      
      @ApiProperty({description:"Ingrese -  ubicacion" , example:"ubicacion"})
      @IsOptional()
      @IsString()
      ubicacion?: string;

      @ApiProperty({description:"Ingrese -  especialidad" , example:"especialidad"})
      @IsOptional()
      @IsString()
      especialidad?: string;
}
