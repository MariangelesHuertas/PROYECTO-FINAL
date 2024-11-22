import { PartialType } from '@nestjs/swagger';
import { CreateAptitudesOfertaDto } from './create-aptitudes_oferta.dto';

export class UpdateAptitudesOfertaDto extends PartialType(CreateAptitudesOfertaDto) {}
