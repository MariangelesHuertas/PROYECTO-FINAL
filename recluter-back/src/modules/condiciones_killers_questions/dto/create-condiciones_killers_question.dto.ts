import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateCondicionesKillersQuestionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  killer_question_id: number;

  @ApiProperty({example: 1})
  @IsNumber()
  minimo: number;

  @ApiProperty({example: 2})
  @IsNumber()
  maximo: number;

  @ApiProperty({example: "valor"})
  @IsString()
  valor: string;
}
