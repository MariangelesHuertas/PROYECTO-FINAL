import { PartialType } from '@nestjs/swagger';
import { CreateSoftSkillsOfertaDto } from './create-soft_skills_oferta.dto';

export class UpdateSoftSkillsOfertaDto extends PartialType(CreateSoftSkillsOfertaDto) {}
