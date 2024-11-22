import { PartialType } from '@nestjs/swagger';
import { CreateTipoPermisoDto } from './create-tipo_permiso.dto';

export class UpdateTipoPermisoDto extends PartialType(CreateTipoPermisoDto) {}
