import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateArchivosPortafolioDto {
    
  @ApiProperty({
    description: 'nombre',
    example: "nombre",
  })
  @IsString()
  titulo: string;

  @ApiProperty({
    description: 'ingresa el portafolio_usuario_id',
    example: 1,
  })
  @IsString()
  portafolio_usuario_id: string;
}
