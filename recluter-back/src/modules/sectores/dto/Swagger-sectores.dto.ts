import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class SwaggerSectoresDto {
    @ApiProperty({ example: 699 })
    @IsInt()
    id: number;


    @ApiProperty({ description: 'Indica el nombre del Sector', example: "sector" })
    @IsString()
    sector: string;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2024-07-08T15:56:45.032Z' })
    @IsDate()
    updatedAt: Date;
}
