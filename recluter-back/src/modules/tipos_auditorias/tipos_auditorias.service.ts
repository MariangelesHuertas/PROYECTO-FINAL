import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTiposAuditoriaDto } from './dto/create-tipos_auditoria.dto';
import { UpdateTiposAuditoriaDto } from './dto/update-tipos_auditoria.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';

const name = "- Empresas - "
@Injectable()
export class TiposAuditoriasService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(TiposAuditoriasService.name)
  }
  async create(createTiposAuditoriaDto: CreateTiposAuditoriaDto) {
    try {
      const result = await this.prisma.tipos_auditorias.create({
        data: {
          ...createTiposAuditoriaDto
        }
      })
      return formatResponseMessages(true, "Operacion Exitosa", [result])

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

 /*    findAll() {
     return `This action returns all tiposAuditorias`;
   } */
 /*
   findOne(id: number) {
     return `This action returns a #${id} tiposAuditoria`;
   }
 
   update(id: number, updateTiposAuditoriaDto: UpdateTiposAuditoriaDto) {
     return `This action updates a #${id} tiposAuditoria`;
   }
 
   remove(id: number) {
     return `This action removes a #${id} tiposAuditoria`;
   } */
}
