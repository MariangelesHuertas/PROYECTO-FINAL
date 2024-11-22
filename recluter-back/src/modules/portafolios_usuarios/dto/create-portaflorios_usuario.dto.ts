import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber, IsInt, IsOptional } from 'class-validator';
import { Type } from "class-transformer";
export class CreatePortafolioUsuarioDto {
  @ApiProperty({ description: 'nombre', example: "nombre" })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'ingresa el titulo', example: "titulo" })
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'ingresa una descripcion', example: "descripcion" })
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'ingresa una url', example: "url" })
  @IsString()
  url: string;

  @ApiProperty({ description: 'titulo1 del archivo', example: "titulo1", required: false })
  @IsOptional()
  @IsString()
  titulo1?: string;

  @ApiProperty({ description: 'titulo2 del archivo', example: "titulo2", required: false })
  @IsOptional()
  @IsString()
  titulo2?: string;

  @ApiProperty({ description: 'titulo3 del archivo', example: "titulo3", required: false })
  @IsOptional()
  @IsString()
  titulo3?: string;

  @ApiProperty({ description: 'Ingresa los soft_skill_id', example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  softSkillsIds: number[];
}
