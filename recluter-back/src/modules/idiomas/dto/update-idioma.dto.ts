import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateIdiomaDto } from './create-idioma.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateIdiomaDto  {
    @ApiProperty({ example: "idioma" })
    @IsString()
    @IsOptional()
    idioma: string;
}
