import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateTiposPreguntaDto  {
    @ApiProperty({
        example: "tipo_string"
    })
    @IsString()
    @IsOptional()
    nombre_tipo?: string;

    @ApiProperty({
        example: "tipo",
    })
    @IsString()
    @IsOptional()
    tipo?: string;
}
