import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateCentrosEducativoDto {

      @ApiProperty({example:"centro_educativo"})
      @IsString()
      @IsOptional()
      centro_educativo?: string;
}
