import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNumber, IsString } from "class-validator";

export class CreateIdiomasUsuarioDto {

    @ApiProperty({ 
        example: [1, 2, 3], 
        description: 'Array of language level IDs' 
    })
    @IsArray() 
    @ArrayNotEmpty()
    @IsNumber({}, { each: true }) 
    nivel_idioma_id: number[];
}


