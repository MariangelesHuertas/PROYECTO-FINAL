import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCondicionesKillersQuestionDto {
    @ApiProperty({example: 1})
    @IsNumber()
    @IsOptional()
    killer_question_id?: number;

    @ApiProperty({ example: 1})
    @IsNumber()
    @IsOptional()
    minimo?: number;

    @ApiProperty({ example: 2})
    @IsNumber()
    @IsOptional()
    maximo?: number;

    @ApiProperty({ example: "ingresa el valor" })
    @IsString()
    @IsOptional()
    valor?: string;
}
