import { ApiProperty } from "@nestjs/swagger"
import { IsInt } from "class-validator"

export class editPermiso{

    @ApiProperty({
        description: 'id de Permiso',
        example: 1,
      })
    @IsInt()
    id:number
    
    @ApiProperty({
        description: 'actualizaremos este campo , inserta el id de Tipo_Permiso',
        example: 1,
      })
    @IsInt()
    tipo_permiso_id:number
}