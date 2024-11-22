import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateNivelesIdiomaDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    idioma_id: number;

    @ApiProperty({ example: "nivel", })
    @IsString()
    nivel: string;
}
