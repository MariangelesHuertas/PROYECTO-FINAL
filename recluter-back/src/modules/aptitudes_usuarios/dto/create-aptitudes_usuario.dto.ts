import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateAptitudesUsuarioDto {
    @ApiProperty({ example:1})
    @IsNumber()
    aptitud_id: number;

}
