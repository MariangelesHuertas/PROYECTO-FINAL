import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsInt, IsNumber, IsString } from 'class-validator';

export class SwaggerIdiomaNivelDto {
    @ApiProperty({ example:1})
    @IsInt()
    id: number;

    @ApiProperty({ example:1})
    @IsInt()
    usuario_id_id: number;


    @ApiProperty({ 
        example: [1, 2, 3], 
        description: 'Array of language level IDs' 
    })
    @IsArray() 
    @ArrayNotEmpty()
    @IsNumber({}, { each: true }) 
    nivel_idioma_id: number[];

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
