
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreatePalabrasClaveDto {

  @ApiProperty({
    example:"palabra clave"
  })
  @IsString()
  palabra: string;

  @ApiProperty({
    example:true
  })
  @IsBoolean()
  aprobado: boolean;
}
