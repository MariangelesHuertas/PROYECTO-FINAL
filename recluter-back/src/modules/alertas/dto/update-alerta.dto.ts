import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";


export class UpdateAlertaDto  {
    
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    tipo_alerta_id?: number;



    @ApiProperty({ example: "nombre", })
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiProperty({ example: "cargo", })
    @IsString()
    @IsOptional()
    cargo?: string;

    @ApiProperty({ example: "temporalidad", })
    @IsString()
    @IsOptional()
    temporalidad?: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    @IsOptional()
    activa?: boolean;
}
