import { PartialType } from '@nestjs/swagger';
import { CreateSoftSkillsUsuarioDto } from './create-soft_skills_usuario.dto';

export class UpdateSoftSkillsUsuarioDto extends PartialType(CreateSoftSkillsUsuarioDto) {}
