import { IsOptional } from "class-validator";

export class UsuarioImagenBannerDto {

  @IsOptional()
  imagen_banner?: Express.Multer.File[];

}