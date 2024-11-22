import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreatePostulacioneDto {
    /* @ApiProperty({description: 'id de usuario_id',example: 1})
    @IsNumber()
    usuario_id: number; */
    
    @ApiProperty({description: 'id de oferta_id',example: 1})
    @IsNumber()
    oferta_id: number;

    @ApiProperty({description: 'id de cv_usaurio_id',example: 1})
    @IsNumber()
    @IsOptional()
    cv_usuario_id?: number;

    @ApiProperty({description: 'id de portafolio_usuario_id',example: 1})
    @IsNumber()
    @IsOptional()
    portafolio_usuario_id?: number;


}
