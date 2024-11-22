import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";


export class UpdateFasePosutlacionDto {

    @ApiProperty({description:"ingresa la fase_postulacion_id" , example:1})
    @IsNumber()
    @IsOptional()
    fase_postulacion_id?:number
}