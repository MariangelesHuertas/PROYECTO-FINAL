import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateCarreraDto {

      @ApiProperty({example:"carrera"})
      @IsString()
      @IsOptional()
      carrera?: string;
}
