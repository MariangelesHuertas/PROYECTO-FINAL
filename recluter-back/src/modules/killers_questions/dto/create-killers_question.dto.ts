import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateKillersQuestionDto {

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    oferta_id: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    tipo_pregunta_id: number;

    @ApiProperty({ example: "pregunta..." })
    @IsString()
    @IsNotEmpty()
    pregunta: string;
}
