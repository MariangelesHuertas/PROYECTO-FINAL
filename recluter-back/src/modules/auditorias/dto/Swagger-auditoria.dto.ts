import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNumber, IsString } from "class-validator";

export class SwaggerAuditoriaDto {
    @ApiProperty({ example: 2 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'Ingrese el nombre', example: 'admin-' })
    @IsString()
    nombre: string

    @ApiProperty({ example: '2024-07-08T15:46:33.224Z' })
    @IsDate()
    createdAt: Date;
  
    @ApiProperty({ example: '2024-07-08T15:46:33.224Z' })
    @IsDate()
    updatedAt: Date;
}
