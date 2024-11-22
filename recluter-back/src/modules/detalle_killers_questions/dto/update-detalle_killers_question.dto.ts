import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDetalleKillersQuestionDto  {
    @ApiProperty({
        example:1,
      })
      @IsNumber()
      @IsOptional()
      killer_question_id?: number;
    
      @ApiProperty({
        example:"detalles ...",
      })
      @IsString()
      @IsOptional()
      detalle?: string;

      @ApiProperty({
        example:true,
      })
      @IsBoolean()
      @IsOptional()
      correcto?: boolean;
}
