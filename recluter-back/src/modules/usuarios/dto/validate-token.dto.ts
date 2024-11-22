import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateTokenDto{



  @ApiProperty({description: 'token de inicio de sesion',example: "lajkf4ñl3hgp3o4h#$#$"})
@IsString()
  token:string
}