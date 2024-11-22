import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateTiposEducacionDto {

      @ApiProperty({example:"tipo_educacion"})
      @IsString()
      @IsOptional()
      tipo_educacion?: string;
}
