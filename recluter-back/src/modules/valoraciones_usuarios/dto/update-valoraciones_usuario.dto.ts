import { PartialType } from '@nestjs/swagger';
import { CreateValoracionesUsuarioDto } from './create-valoraciones_usuario.dto';

export class UpdateValoracionesUsuarioDto extends PartialType(CreateValoracionesUsuarioDto) {}
