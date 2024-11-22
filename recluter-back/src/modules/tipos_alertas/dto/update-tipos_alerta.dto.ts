import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateTiposAlertaDto  {
    
    @ApiProperty({ example: "tipo", })
    @IsString()
    @IsOptional()
    tipo?: string;
}
