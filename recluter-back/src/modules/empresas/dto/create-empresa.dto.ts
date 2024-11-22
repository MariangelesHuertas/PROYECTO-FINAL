import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUsuarioDto } from 'src/modules/usuarios/dto/create-usuario.dto';

export class CreateEmpresaDto extends CreateUsuarioDto {

  /*  @ApiProperty({
     example:1,
   })
   @IsNumber()
   usuario_id: number; */


  @ApiProperty({
    description: 'ingresa el sector_id',
    example: "PERU SAC",
  })
  @IsOptional()
  @IsNumber()
  sector_id: number;

  @ApiProperty({
    description: 'nombre de la EMPRESA',
    example: "PERU SAC",
  })
  @IsString()
  empresa: string;


  @ApiProperty({
    description: 'logo ',
    example: "logo",
  })
  @IsOptional()
  @IsString()
  logo: string;


  @ApiProperty({
    description: 'banner',
    example: "banner",
  })
  @IsOptional()
  @IsString()
  banner: string;


  @ApiProperty({
    description: 'pagina_web',
    example: "pagina_web",
  })
  @IsString()
  pagina_web: string;


  @ApiProperty({
    description: 'indica sede_fiscal',
    example: "sede_fiscal",
  })
  @IsString()
  sede_fiscal: string;

  @ApiProperty({
    description: 'indica tamanio',
    example: "descripcion",
  })
  @IsOptional()
  @IsString()
  tamanio: string;

  @ApiProperty({
    description: 'indica la descripcion',
    example: "descripcion",
  })
  @IsString()
  descripcion: string;


  @ApiProperty({
    description: 'indica la ubicacion',
    example: "ubicacion",
  })
  @IsOptional()
  @IsString()
  ubicacion: string;
}