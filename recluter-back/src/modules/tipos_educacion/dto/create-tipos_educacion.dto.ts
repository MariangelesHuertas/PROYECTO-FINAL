import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTiposEducacionDto {

      @ApiProperty({example:"tipo_educacion"})
      @IsString()
      tipo_educacion: string;

}
