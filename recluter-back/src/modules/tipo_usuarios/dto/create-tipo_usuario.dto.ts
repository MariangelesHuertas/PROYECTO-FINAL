import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTipoUsuarioDto {

    @ApiProperty({
        description: 'nombre del Tipo_Usuario',
        example: 'seguridad',
      })
    @IsString()
    tipo_usuario:string
}
