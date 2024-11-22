import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ParametrosAlertasOfertas {

      @ApiProperty({example:"2024-08-01"})
      @IsString()
      @IsOptional()
      fecha_inicio?: string;

      @ApiProperty({example:"2024-08-01"})
      @IsString()
      @IsOptional()
      fecha_fin?: string;
    
}
