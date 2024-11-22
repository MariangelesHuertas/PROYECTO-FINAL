import { PartialType } from '@nestjs/swagger';
import { CreateAlertasOfertaDto } from './create-alertas_oferta.dto';

export class UpdateAlertasOfertaDto extends PartialType(CreateAlertasOfertaDto) {}
