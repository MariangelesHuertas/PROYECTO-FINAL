import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTiposAuditoriaDto {
   

    @ApiProperty({ description: 'Ingrese el nombre', example: 'admin-' })
    @IsString()
    nombre: string


}
