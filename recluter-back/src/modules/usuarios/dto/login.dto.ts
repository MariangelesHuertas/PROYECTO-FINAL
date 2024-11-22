import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LoginDto {

  @ApiProperty({
    description: "nombre del usuario",
    example: "usuario2342"
  })
  @IsString()
  usuario: string;

  @ApiProperty({
    description: "contraseña del usuario , que sea mayor a 10",
    example: "admin123"
  })
  @MinLength(1)
  contrasena: string;
}