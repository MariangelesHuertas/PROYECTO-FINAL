import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateKillersQuestionDto{
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    oferta_id?: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    tipo_pregunta_id?: number;

    @ApiProperty({ example: "pregunta..." })
    @IsString()
    @IsOptional()
    pregunta?: string;
}
