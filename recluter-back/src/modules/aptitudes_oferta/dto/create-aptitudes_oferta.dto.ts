import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class AptitudesArray {
    @ApiProperty({ type: Number, description: 'ID de la aptitud', example: 1 })
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiProperty({ type: String, description: 'Descripción de la aptitud', example: 'Tecnología' })
    @IsString()
    aptitud: string;

    @IsString()
    @IsOptional()
    label?: string

    @IsNumber()
    @IsOptional()
    key?: number

    @IsNumber()
    @IsOptional()
    value?: number
}
export class CreateAptitudesOfertaDto {
    @ApiProperty({
        type: () => [AptitudesArray],
        description: 'Array de objetos AptitudesArray',
        example: [
            { id: 1, palabra_clave: 'aptitud 1' },
            { id: 2, palabra_clave: 'aptitud 2' },
            { id: 3, palabra_clave: 'aptitud 3' }
        ]
    })
    @ValidateNested({ each: true })
    @Type(() => AptitudesArray)
    aptitudes_array: AptitudesArray[];

    @ApiProperty({ type: Number, description: 'ID de la Oferta', example: 1 })
    @IsNumber()
    oferta_id: number
}