import { PartialType } from '@nestjs/swagger';
import { CreatePostulacionesGuardadaDto } from './create-postulaciones_guardada.dto';

export class UpdatePostulacionesGuardadaDto extends PartialType(CreatePostulacionesGuardadaDto) {}
