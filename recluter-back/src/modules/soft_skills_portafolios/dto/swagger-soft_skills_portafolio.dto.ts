import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt } from "class-validator";

export class SwaggerCountResponse {
    @ApiProperty({ description: 'Numero de registros insertados' })
    count: number;
}