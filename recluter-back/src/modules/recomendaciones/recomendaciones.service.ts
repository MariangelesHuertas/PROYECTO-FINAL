import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRecomendacioneDto } from './dto/create-recomendacione.dto';
import { UpdateRecomendacioneDto } from './dto/update-recomendacione.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { Request } from 'express';
@Injectable()
export class RecomendacionesService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,

  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(RecomendacionesService.name)
  }


  async countExperiencias(user_id: number) {
    try {
      const busqueda = await this.prisma.experiencias_laborales_usuarios.findMany({
        where: {
          usuario_id: user_id
        }
      })
      return busqueda !== null;
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }
  async findAllRecomendationsOfertas( request: Request ) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const experiencias = await this.prisma.experiencias_laborales_usuarios.findMany({
        where: {
          usuario_id: userId
        },
        select: {
          id: true,
          sector_id: true,
          empresa_id: true,
          cargo: true
        }
      })
      console.log(experiencias , "================================================>")
      // AQUI EXTRAEREMOS ORDENAREMOS SEGUN SU CONCUERRENCIA en el array
      const arraySectores = [...new Set(
        experiencias
          .map(e => e.sector_id)
          .sort((a, b) =>
            experiencias.filter(e => e.sector_id === b).length - experiencias.filter(e => e.sector_id === a).length
          )
      )] as number[]; 
      const getEmpresa = await this.getEmpresas(arraySectores)
  /*     console.log(getEmpresa , "--------->") */
      //extraer cargos
      const palabras = ["el", "la", "los", "las", "de", "del", "y", "o", "a", "un", "una", "por", "para", "con", "sin", "sobre", "entre"];
      const array_cargo = experiencias
        .map(v => v.cargo.split(' ')
          .filter(palabra => !palabras.includes(palabra.toLocaleLowerCase())))
        .flat();
      const array_cargo_unicas = [...new Set(array_cargo)];
     /*  console.log( [
        getEmpresa,
        array_cargo_unicas
      ]) */
      return [
        getEmpresa,
        array_cargo_unicas
      ]

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }



  async getEmpresas(sectores_id: number[],) {
    try {
      if (!Array.isArray(sectores_id) || !sectores_id.every(id => typeof id === 'number')) {
        throw new Error('sectores_id debe ser un arreglo de números');
      }
      const result = await this.prisma.empresas.findMany({
        where: {
          sector_id: {
            in: sectores_id
          }
        },
        select: {
          id: true
        }
      })
      console.log(result , "obtner empresas en base a sectores")
      const arrayEmpresasId = result.map(v => v.id)

      return arrayEmpresasId


    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }
  create(createRecomendacioneDto: CreateRecomendacioneDto) {
    return 'This action adds a new recomendacione';
  }

  findAll() {
    return `This action returns all recomendaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recomendacione`;
  }

  update(id: number, updateRecomendacioneDto: UpdateRecomendacioneDto) {
    return `This action updates a #${id} recomendacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} recomendacione`;
  }
}
