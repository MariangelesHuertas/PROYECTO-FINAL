import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCentrosEducativoDto {

      @ApiProperty({example:"centro_educativo",})
      @IsString()
      centro_educativo: string;

      @ApiProperty({example:"ubicacion",})
      @IsString()
      ubicacion: string;
}
