import { PartialType } from '@nestjs/swagger';
import { CreateCvGeneralDto } from './create-cv_general.dto';

export class UpdateCvGeneralDto extends PartialType(CreateCvGeneralDto) {}
