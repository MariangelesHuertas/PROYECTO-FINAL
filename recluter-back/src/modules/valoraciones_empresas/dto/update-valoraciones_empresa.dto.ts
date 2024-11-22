import { PartialType } from '@nestjs/swagger';
import { CreateValoracionesEmpresaDto } from './create-valoraciones_empresa.dto';

export class UpdateValoracionesEmpresaDto extends PartialType(CreateValoracionesEmpresaDto) {}
