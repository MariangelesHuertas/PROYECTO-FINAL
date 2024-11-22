import { PartialType } from '@nestjs/swagger';
import { CreateEmpresasSeguidaDto } from './create-empresas_seguida.dto';

export class UpdateEmpresasSeguidaDto extends PartialType(CreateEmpresasSeguidaDto) {}
