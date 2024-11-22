import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePalabrasClaveDto  {

  @ApiProperty({
    example:"palabra clave"
  })
  @IsOptional()
  @IsString()
  palabra?: string;

  @ApiProperty({
    example:true
  })
  @IsOptional()
  @IsBoolean()
  aprobado?: boolean;

}
