import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreatePostulacionesGuardadaDto {
 
    @ApiProperty({description: 'id de oferta_id',example: 1})
    @IsInt()
    oferta_id: number;
}
