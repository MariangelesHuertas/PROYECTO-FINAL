import { PartialType } from '@nestjs/swagger';
import { CreateAptitudesUsuarioDto } from './create-aptitudes_usuario.dto';

export class UpdateAptitudesUsuarioDto extends PartialType(CreateAptitudesUsuarioDto) {}
