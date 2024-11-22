import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDate } from 'class-validator';

export class SwaggerUpdateUser {
  @ApiProperty({ example: 'usuario@gmail.com' })
  @IsString()
  email: string;

  // @ApiProperty({ example: 'password' })
  // @IsString()
  // contrasena: string;

  // @ApiProperty({ example: 157 })
  // @IsInt()
  // persona_id: number;

  // @ApiProperty({ example: 112 })
  // @IsInt()
  // tipo_usuario_id: number;

  // @ApiProperty({ example: '2024-07-08T16:01:09.977Z' })
  // @IsDate()
  // createdAt: Date;

  // @ApiProperty({ example: '2024-07-08T16:01:09.977Z' })
  // @IsDate()
  // updatedAt: Date;
}
