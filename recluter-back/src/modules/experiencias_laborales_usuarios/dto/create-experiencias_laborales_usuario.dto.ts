import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExperienciasLaboralesUsuarioDto {

  @ApiProperty({
    description: 'inserta la empresa Id',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  empresa_id?: number;

  /*  @ApiProperty({
       description: 'inserta el usuarioID',
       example: 1,
   })
   @IsInt()
   usuario_id: number; */

  @ApiProperty({
    description: 'inserta el cargo',
    example: "2024-07-26T14:42:52.136Z",
  })
  @IsString()
  cargo: string;


  @ApiProperty({
    description: 'inserta la descripcion',
    example: "2024-07-26T14:42:52.136Z",
  })
  @IsString()
  descripcion: string;


  @ApiProperty({
    description: 'inserta el nombre de la empresa',
    example: "usuario1",
  })
  @IsString()
  @IsOptional()
  nombre_empresa?: string;


  @ApiProperty({
    description: 'ingresa la fecha de inicio',
    example: "2024-07-26T14:42:52.136Z",
  })
  @IsDateString()
  fecha_inicio: Date;

  @ApiProperty({
    description: 'ingresa la fecha de finalizacion',
    example: "2024-07-26T14:42:52.136Z",
  })
  @IsDateString()
  fecha_fin: Date;


  @ApiProperty({
    description: 'inserta el id_sector',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  sector_id?: number;



  @ApiProperty({
    description: 'inserta el nombre del sector',
    example: "sector1",
  })
  @IsString()
  @IsOptional()
  nombre_sector?: string;


  @ApiProperty({
    description: 'inserta el lugar de trabajo',
    example: "lugar de trabajo",
  })
  @IsString()
  @IsOptional()
  lugar_trabajo?: string;






}
