import { IsOptional } from "class-validator";

export class UsuarioImagenDto {

  @IsOptional()
  imagen?: Express.Multer.File[];
 
}