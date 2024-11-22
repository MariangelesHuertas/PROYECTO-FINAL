import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateIdiomaDto {

    
    @ApiProperty({ example: "idioma" })
    @IsString()
    idioma: string;
}
