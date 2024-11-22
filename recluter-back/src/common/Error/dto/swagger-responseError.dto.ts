import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString, IsArray, IsOptional } from 'class-validator';

export class SwaggerResponseFormatDto {
  @ApiProperty({ 
    description: 'Estado de la operacion' , 
    example:false })
  @IsBoolean()
  respuesta: boolean;

  @ApiProperty({ 
    description: 'Descripcion de la operacion' ,
    example:"Hubo un error"
})
  @IsString()
  mensaje: string;

  @ApiProperty({ description: 'Retorno de la peticion', type: [Object] })
  @IsOptional()
  @IsArray()
  data?: any[];

  @ApiPropertyOptional({ 
    description: 'Mensaje de desarrollo opcional' , 
    example:"Detalle del error ..."
   })
  @IsString()
  @IsOptional()
  mensaje_dev?: string;

  @ApiProperty({ description: 'Retorno de la peticio', type: [Object] })
  @IsOptional()
  @IsArray()
  meta?: any;

}
