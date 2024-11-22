import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt } from "class-validator";

export class SwaggerCountResponse {
    @ApiProperty({ description: 'Numero de registros insertados' })
    count: number;
}

export class SwaggerPalabraOfertaDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'palabra_clave_id', example: [1,2,3]})
    @IsInt()
    palabra_clave_id: number;

    @ApiProperty({ description: 'oferta_id', example: 1 })
    @IsInt()
    oferta_id:number;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
