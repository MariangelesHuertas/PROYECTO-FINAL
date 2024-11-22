import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateCondicionesKillersQuestionDto } from './dto/create-condiciones_killers_question.dto';
import { UpdateCondicionesKillersQuestionDto } from './dto/update-condiciones_killers_question.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationCondicionKillerQuestionsDto } from './dto';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { Request } from 'express';
const name = "- condicion_killer_question -"
@Injectable()
export class CondicionesKillersQuestionsService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(CondicionesKillersQuestionsService.name)
  }
  async create(createCondicionesKillersQuestionDto: CreateCondicionesKillersQuestionDto,  request: Request) {
    try {
      const result = await this.prisma.condiciones_killers_questions.create({
        data: {
          ...createCondicionesKillersQuestionDto
        }
      })

      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(""),
        descripcion: `Creamos una ${name}`,
        accion: 1,
        ruta: request.url,
        log: "",
        tabla: `${name}`,
        pk_actualizado: result.id
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAll(paginateCondicionKillerQuestion: PaginationCondicionKillerQuestionsDto) {
    const { limit = 10, page = 1, minimo, maximo, valor, sortColumn = "id", sortOrder = "asc" } = paginateCondicionKillerQuestion;
    try {
      const where: any = {
        AND: [
          minimo !== undefined ? {
            minimo: {
              equals: minimo,
            },
          } : undefined,
          maximo !== undefined ? {
            maximo: {
              equals: maximo,
            },
          } : undefined,
          valor ? {
            valor: {
              contains: valor,
              // mode: 'insensitive',
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.condiciones_killers_questions.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy
      });
      const total = await this.prisma.condiciones_killers_questions.count()
      const meta = {
        limit: limit,
        page: page,
        minimo: minimo,
        maximo: maximo,
        valor: valor,
        total,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.condiciones_killers_questions.findFirst({
        where: { id: id }
      });
      if (!result) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontró  ${name} con el ID proporcionado`, []));
      }
      return formatResponseMessages(true, 'Operación exitosa', [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async update(id: number, updateCondicionesKillersQuestionDto: UpdateCondicionesKillersQuestionDto,  request: Request) {
    try {
      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.condiciones_killers_questions.update({
          where: { id },
          data: { ...updateCondicionesKillersQuestionDto }
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(busqueda),
          descripcion: `Actualizamos una ${name}`,
          accion: 2,
          ruta: request.url,
          log: "",
          tabla: `${name}`,
          pk_actualizado: result.id
        }
        this.auditoriaService.logAuditoria(envio)
        return formatResponseMessages(true, 'Operacion Exitosa', [result]);
      } else {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error)
      throw new BadRequestException(formatResponseMessages(false, "Error", [], message))
    }
  }

  async remove(id: number,  request: Request) {
    try {

      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.condiciones_killers_questions.delete({
          where: { id },
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(""),
          jsonsalida: JSON.stringify(result),
          descripcion: `Eliminamos una ${name}`,
          accion: 1,
          ruta: request.url,
          log: "",
          tabla: `${name}`,
          pk_actualizado: result.id
        }
        this.auditoriaService.logAuditoria(envio)
        return formatResponseMessages(true, 'Operacion Exitosa', [result]);
      } else {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error)
      throw new BadRequestException(formatResponseMessages(false, "Error", [], message))
    }
  }
  async findById(id: number): Promise<Boolean> {
    try {
      const busqueda = await this.prisma.condiciones_killers_questions.findFirst({
        where: {
          id: id
        }
      })
      return busqueda !== null;
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw new BadRequestException(formatResponseMessages(false, "Error", [], message));
    }
  }
}
