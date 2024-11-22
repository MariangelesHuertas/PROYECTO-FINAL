import { PartialType } from '@nestjs/swagger';
import { CreatePalabrasClaveOfertaDto } from './create-palabras_clave_oferta.dto';

export class UpdatePalabrasClaveOfertaDto extends PartialType(CreatePalabrasClaveOfertaDto) {}
