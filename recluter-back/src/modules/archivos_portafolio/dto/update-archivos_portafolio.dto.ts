import { PartialType } from '@nestjs/swagger';
import { CreateArchivosPortafolioDto } from './create-archivos_portafolio.dto';

export class UpdateArchivosPortafolioDto extends PartialType(CreateArchivosPortafolioDto) {}
