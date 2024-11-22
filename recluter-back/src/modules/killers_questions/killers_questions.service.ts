import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateKillersQuestionDto } from './dto/create-killers_question.dto';
import { UpdateKillersQuestionDto } from './dto/update-killers_question.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { PaginationKillerQuestionDto } from './dto';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { Request } from 'express';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { CreateKillersQuestionsDetailsDto } from './dto/create-killers-questions-details.dto';
const name = "- killer_questions -"
@Injectable()
export class KillersQuestionsService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }

  onModuleInit() {
    this.databaseErrorService.setLoggerContext(KillersQuestionsService.name)
  }

  async create(createKillersQuestionDto: CreateKillersQuestionDto, request: Request) {
    try {
      const result = await this.prisma.killers_questions.create({
        data: {
          ...createKillersQuestionDto
        }
      })

      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(""),
        descripcion: "",
        accion: 1,
        ruta: request.url,
        log: "",
        tabla: "carrera",
        pk_actualizado: result.id
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async createDetails(createKillersQuestionsDetailsDto: CreateKillersQuestionsDetailsDto, request: Request) {
    try {

      const killers_questions = createKillersQuestionsDetailsDto;

      await this.prisma.ofertas.update({
        where: {
          id: killers_questions.oferta_id
        },
        data: {
          borrador: false,
          dateApertura: new Date()
        }
      })

      await killers_questions.questions.map(async (question) => {
        const questionCreate = await this.prisma.killers_questions.create({
          data: {
            oferta_id: killers_questions.oferta_id,
            tipo_pregunta_id: question.tipo_pregunta_id,
            pregunta: question.question
          }
        })

        if (questionCreate) {
          await question.options.map(async (option: string) => {
            await this.prisma.detalle_killers_questions.create({
              data: {
                killer_question_id: questionCreate.id,
                detalle: option,
                correcto: false
              }
            })
          })
        }
      })

      // const envio: AuditoriaInterfaz = {
      //   tipo_auditoria_id: 1,
      //   user_token: request['authAuthorization'],
      //   ip: request['ipAddress'],
      //   jsonentrada: JSON.stringify(result),
      //   jsonsalida: JSON.stringify(""),
      //   descripcion: "",
      //   accion: 1,
      //   ruta: request.url,
      //   log: "",
      //   tabla: "carrera",
      //   pk_actualizado: result.id
      // }
      // this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, "Operacion Exitosa", [])
    } catch (error) {
      console.log("error: ---------");
      console.log(error);

      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAll(paginate: PaginationKillerQuestionDto) {
    const { limit = 10, page = 1, pregunta, sortColumn = "id", sortOrder = "asc" } = paginate;
    try {
      const where: any = {
        AND: [

          pregunta !== undefined ? {
            pregunta: {
              contains: pregunta,
              //mode: 'insensitive',
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.killers_questions.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy
      });

      const total = await this.prisma.killers_questions.count()
      const meta = {
        limit: limit,
        page: page,
        pregunta,
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
      const result = await this.prisma.killers_questions.findFirst({
        where: { id: id }
      });
      if (!result) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontró  ${name} con el ID proporcionado`, []));
      }
      return formatResponseMessages(true, 'Operación exitosa', [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);;
    }
  }

  async getKillerQuestionsDetailsOfferId(offerId: number) {
    try {

      const result = await this.prisma.killers_questions.findMany({
        where: { oferta_id: offerId },
        include: {
          tipos_preguntas: true,
          condiciones: true,
          detalle_killers: true
        },
        orderBy: {
          id: 'asc'
        }
      });

      if (!result) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontró  ${name} con el ID proporcionado`, []));
      }

      return formatResponseMessages(true, 'Operación exitosa', result);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);;
    }
  }

  async update(id: number, updateKillersQuestionDto: UpdateKillersQuestionDto, request: Request) {
    try {
      const busqueda = this.findById(id)
      if (busqueda) {
        const result = await this.prisma.killers_questions.update({
          where: { id },
          data: { ...updateKillersQuestionDto }
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(""),
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
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async remove(id: number, request: Request) {
    try {

      const busqueda = this.findById(id)
      if (busqueda) {
        const result = await this.prisma.killers_questions.delete({
          where: { id },
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(""),
          descripcion: `Eliminamos una ${name}`,
          accion: 3,
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
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findById(id: number): Promise<Boolean> {
    try {
      const busqueda = await this.prisma.killers_questions.findFirst({
        where: {
          id: id
        }
      })
      return busqueda !== null;
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
}
