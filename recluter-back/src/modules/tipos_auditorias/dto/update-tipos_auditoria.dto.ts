import { PartialType } from '@nestjs/swagger';
import { CreateTiposAuditoriaDto } from './create-tipos_auditoria.dto';

export class UpdateTiposAuditoriaDto extends PartialType(CreateTiposAuditoriaDto) {}
