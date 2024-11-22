import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateAlertasOfertaDto {
    @ApiProperty({type:Number, description: 'ID de la alerta' , example: 1})
    @IsNumber()
    alerta_id: number;
    
    @ApiProperty({type:Number, description: 'ID de la oferta', example: 1 })
    @IsNumber()
    oferta_id: number
}
