import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateEmpresasSeguidaDto {

    @ApiProperty({
        description: 'id_empresa',
        example: 1,
      })
      @IsNumber()
      empresa_id: number;
}
