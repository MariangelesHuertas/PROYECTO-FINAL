import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSoftSkillDto {

    @ApiProperty({
        example:"soft -skill"
      })
    @IsString()
    @IsOptional()
    soft_skill?: string;
  
    @ApiProperty({
        example:true
      })
    @IsBoolean()
    @IsOptional()
    aprobado?:boolean;
}
