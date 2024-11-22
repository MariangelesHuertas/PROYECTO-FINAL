import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteAptitudesUsuarioDto {
    @ApiProperty({ example:1})
    @IsNumber()
    aptitude_id: number;



}
