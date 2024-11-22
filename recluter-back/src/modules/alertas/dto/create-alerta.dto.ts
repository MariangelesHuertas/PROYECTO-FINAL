import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class CreateAlertaDto {


    @ApiProperty({ example: 1 })
    @IsInt()
    tipo_alerta_id: number;


    @ApiProperty({ example: "nombre", })
    @IsString()
    nombre: string;

    @ApiProperty({ example: "cargo", })
    @IsString()
    cargo: string;

    @ApiProperty({ example: "temporalidad", })
    @IsString()
    temporalidad: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    activa: boolean;
}
