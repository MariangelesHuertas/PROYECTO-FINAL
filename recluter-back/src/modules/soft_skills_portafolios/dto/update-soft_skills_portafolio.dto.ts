import { PartialType } from '@nestjs/swagger';
import { CreateSoftSkillsPortafolioDto } from './create-soft_skills_portafolio.dto';

export class UpdateSoftSkillsPortafolioDto extends PartialType(CreateSoftSkillsPortafolioDto) {}
