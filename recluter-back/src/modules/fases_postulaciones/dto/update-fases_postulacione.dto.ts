import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFasesPostulacioneDto  {
    @ApiProperty({ example: "fase" })
    @IsString()
    @IsOptional()
    fase?: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    prioridad?: number;
}
