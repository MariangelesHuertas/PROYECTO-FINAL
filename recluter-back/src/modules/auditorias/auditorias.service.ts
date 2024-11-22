import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { CreateAuditoriaDto , UpdateAuditoriaDto ,  BusquedaAuditoria } from './dto/';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from './interface/auditorias.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuditoriasService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(AuditoriasService.name)
  }
  async create(createAuditoriaDto: CreateAuditoriaDto) {
    try {
      const result = await this.prisma.auditorias.create({
        data: {
          ...createAuditoriaDto
        }
      })
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.auditorias.findMany()
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async logAuditoria(auditoria: AuditoriaInterfaz) {
    const { user_token, accion, tabla, ruta, ...rest } = auditoria

    let accionString = accion
    if (typeof accion === "number") {
      accionString = accion == 1 ? "crear" : accion == 2 ? "update" : accion == 3 ? "eliminar" : "otros"
    }
    try {
      const nameTabla = tabla.replace(/-/g, '').trim().toLocaleLowerCase()
      const nuevaRuta = ruta.split('?')[0]
     /*  let token
      if (!user_token) {
        throw new UnauthorizedException('Token no proporcionado')
      }
      if (user_token.includes("Bearer")) {
        token = user_token && user_token.split(' ')[1];
      } else {
        token = user_token
      }
      const decodedToken = this.jwtService.verify(token); */
      const userId = await this.getUserIdByToken(user_token)
      const result = await this.prisma.auditorias.create({
        data: {
          ...rest,
          ruta: nuevaRuta,
          tabla: nameTabla,
          usuario_id: userId,
          accion: accionString
        }
      })

      return formatResponseMessages(true, 'Operación exitosa', [result]);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
          console.log("UnauthorizedException: Token no proporcionado");
          return formatResponseMessages(false, 'Unauthorized: Token no proporcionado', []);
      } else {
          const message = this.databaseErrorService.handleDBErrorMessage(error);
          console.log("Error en la base de datos:", message);
          return formatResponseMessages(false, `Error en la operación: ${message}`, []);
      }
  }

  }
  async getUserIdByToken(user_token:string):Promise<number>{
    let token
    if (!user_token) {
      throw new UnauthorizedException('Token no proporcionado')
    }
    if (user_token.includes("Bearer")) {
      token = user_token && user_token.split(' ')[1];
    } else {
      token = user_token
    }
    const decodedToken = this.jwtService.verify(token);
    const userId = decodedToken.id;
    return +userId
  }
  async findTableUser(auditoria: BusquedaAuditoria) {
    const { tabla, pk_actualizado } = auditoria
    try {
      const result = await this.prisma.auditorias.findMany({ where: { AND: [{ tabla }, { pk_actualizado }] } })

      if (!result) {
        return formatResponseMessages(true, 'No hay registros', null);
      }
      return formatResponseMessages(true, 'Operación exitosa', result);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  /* 
    findOne(id: number) {
      return `This action returns a #${id} auditoria`;
    }
  
    update(id: number, updateAuditoriaDto: UpdateAuditoriaDto) {
      return `This action updates a #${id} auditoria`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} auditoria`;
    } */
}
