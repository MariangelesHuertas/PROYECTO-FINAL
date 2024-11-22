import { PartialType } from '@nestjs/swagger';
import { CreatePalabrasClaveAlertaDto } from './create-palabras_clave_alerta.dto';

export class UpdatePalabrasClaveAlertaDto extends PartialType(CreatePalabrasClaveAlertaDto) {}
