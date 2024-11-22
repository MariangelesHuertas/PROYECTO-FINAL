import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateFasesPostulacioneDto {

        
    @ApiProperty({ example: "fase" })
    @IsString()
    fase: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    prioridad: number;
}
