import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateDetalleKillersQuestionDto {
    @ApiProperty({
        example:1,
      })
      @IsNumber()
      killer_question_id: number;
    
      @ApiProperty({
        example:"detalles ...",
      })
      @IsString()
      detalle: string;

      @ApiProperty({
        example:true,
      })
      @IsBoolean()
      correcto: boolean;
}
