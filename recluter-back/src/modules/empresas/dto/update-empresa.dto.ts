import { ApiProperty} from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEmpresaDto {

    @ApiProperty({
        example:"google",
      })
    @IsString()
    @IsOptional()
    empresa?: string;
}