
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateSoftSkillDto {

  @ApiProperty({
    example:"soft -skill"
  })
  @IsString()
  soft_skill: string;

  @ApiProperty({
    example:true
  })
  @IsBoolean()
  aprobado:boolean;
}