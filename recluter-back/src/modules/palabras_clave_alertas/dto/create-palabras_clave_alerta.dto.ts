import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreatePalabrasClaveAlertaDto {
    @ApiProperty({type:Number, description: 'array de ID de la palabra clave' , example: [1, 2, 3]})
    @IsNumber({},{ each: true })
    palabra_clave_id: number[];
    
    @ApiProperty({type:Number, description: 'ID de la alerta', example: 1 })
    @IsNumber()
    alerta_id: number
}
