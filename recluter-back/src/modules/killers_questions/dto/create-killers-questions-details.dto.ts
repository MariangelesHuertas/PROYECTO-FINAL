import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateKillersQuestionsDetailsDto {

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    oferta_id: number;

    @ApiProperty({ example: [] })
    @IsArray()
    questions: {
        tipo_pregunta_id: number;
        question: string;
        options: string [];

        min?: number
    } []
}
