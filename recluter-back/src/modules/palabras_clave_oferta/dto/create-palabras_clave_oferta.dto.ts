import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PalabraClaveArray {
  @ApiProperty({ type: Number, description: 'ID de la palabra clave', example: 1 })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ type: String, description: 'Descripción de la palabra clave', example: 'Tecnología' })
  @IsString()
  palabra_clave: string;

  @IsString()
  @IsOptional()
  label?: string

  @IsNumber()
  @IsOptional()
  key?: number

  @IsNumber()
  @IsOptional()
  value?: number
}

export class CreatePalabrasClaveOfertaDto {
  @ApiProperty({
    type: () => [PalabraClaveArray],
    description: 'Array de objetos PalabraClaveArray',
    example: [
      { id: 1, palabra_clave: 'Tecnología' },
      { id: 2, palabra_clave: 'Desarrollo' },
      { id: 3, palabra_clave: 'Software' }
    ]
  })
  @ValidateNested({ each: true }) 
  @Type(() => PalabraClaveArray) 
  palabras_claves: PalabraClaveArray[];

  @ApiProperty({ type: Number, description: 'ID de la Oferta', example: 1 })
  @IsNumber()
  oferta_id: number;
}