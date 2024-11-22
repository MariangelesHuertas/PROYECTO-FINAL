import { ApiProperty } from "@nestjs/swagger";

import { IsNumber, IsOptional, IsString } from "class-validator";

export class FilterOfertas {

    @ApiProperty({ type: [Number], description: 'Array de valoraciones_empresas', example: [1 ,2,3] })
    @IsOptional()
    @IsNumber({},{ each: true })
    valoraciones_empresasArray?: number[];


}




