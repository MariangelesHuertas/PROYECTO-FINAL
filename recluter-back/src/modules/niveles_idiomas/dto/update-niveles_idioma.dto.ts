import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNivelesIdiomaDto } from './create-niveles_idioma.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateNivelesIdiomaDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    idioma_id?: number;
     
    @ApiProperty({ example: "nivel", })
    @IsString()
    @IsOptional()
    nivel?: string;

}
