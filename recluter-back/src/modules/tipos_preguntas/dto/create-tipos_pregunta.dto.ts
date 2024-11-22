import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTiposPreguntaDto {

    @ApiProperty({example: "1"})
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({example: "tipo_string"})
    @IsString()
    nombre_tipo: string;

    @ApiProperty({ example: "tipo", })
    @IsString()
    tipo: string;
}
