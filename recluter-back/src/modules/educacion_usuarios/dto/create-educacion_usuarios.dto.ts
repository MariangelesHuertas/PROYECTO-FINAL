import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEducacionUsuarioDto {

      @ApiProperty({type:Number, description:"ID de tipo_educacion_id" , example:1 })
      @IsNumber()
      tipo_educacion_id: number;

      
      @ApiProperty({description:"ID de centro_educativo_id" , example:1})
      @IsNumber()
      @IsOptional()
      centro_educativo_id?: number;

      
/*       @ApiProperty({description:"ID de usuario_id" , example:1})
      @IsNumber()
      usuario_id: number;
 */
      
      @ApiProperty({description:"ID de carrera_id" , example:1})
      @IsNumber()
      @IsOptional()
      carrera_id?: number;


      @IsDateString()
      fecha_inicio: Date;
    
      @IsDateString()
      fecha_final: Date;


      @ApiProperty({description:"Ingrese -  nombre_centro_educativo" , example:"nombre_centro_educativo"})
      @IsString()
      nombre_centro_educativo: string;

      @ApiProperty({description:"Ingrese -  carrera" , example:"carrera"})
      @IsString()
      carrera: string;

      
      @ApiProperty({description:"Ingrese -  ubicacion" ,example:"ubicacion"})
      @IsString()
      ubicacion: string;
      
      @ApiProperty({description:"Ingrese -  especialidad" , example:"especialidad"})
      @IsOptional()
      @IsString()
      especialidad?: string;

}
