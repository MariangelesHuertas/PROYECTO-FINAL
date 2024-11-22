import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTipoPermisoDto {
    @ApiProperty({
        description: 'nombre del tipo de Permiso',
        example: 'administrador5',
      })
    @IsString()
    tipo:string
}
