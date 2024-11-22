import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateSectoreDto {

    
      @ApiProperty({ example:"sector"})
      @IsString()
      sector: string;
}
