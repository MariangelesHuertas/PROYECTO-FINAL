import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCarreraDto {

      @ApiProperty({example:"carrera",
})
      @IsString()
      carrera: string;
}
