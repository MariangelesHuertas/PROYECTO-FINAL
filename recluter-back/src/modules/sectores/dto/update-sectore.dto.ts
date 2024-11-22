import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSectoreDto } from './create-sectore.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSectoreDto{


    @ApiProperty({
        example:"sector",
      })
    @IsString()
    @IsOptional()
    sector?: string;
}
