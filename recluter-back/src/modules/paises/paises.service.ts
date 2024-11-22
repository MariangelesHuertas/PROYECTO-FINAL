import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Asegúrate de importar el servicio Prisma
import { CreatePaiseDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';
import { PaginationPaisesDto } from './dto/pagination-paises.dto';
import { formatResponseMessages } from 'src/common/Error/interfaces/response.interface';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { filter } from 'rxjs';

@Injectable()
export class PaisesService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(PaisesService.name)
  }

  create(createPaiseDto: CreatePaiseDto) {
    return 'This action adds a new paise';
  }

  async findAll(paginate: PaginationPaisesDto) {
    const {
      limit = 10,
      page = 1,
      pais,
      sortColumn = "id",
      sortOrder = "asc"
    } = paginate;

    try {
      // Construir la condición WHERE
      const where : any = {
        AND: [
          pais !== undefined ? {
            pais: {
              contains: pais,
            },
          }: undefined,
        ].filter(Boolean),
      };

      // Validar que sortColumn sea un campo válido
      const validColumns = ['id', 'pais'];
      const actualSortColumn = validColumns.includes(sortColumn) ? sortColumn : 'id';

      // Construir el orderBy
      const orderBy = {
        [actualSortColumn]: sortOrder.toLowerCase() as 'asc' | 'desc'
      };

      // Ejecutar la consulta
      const [paises, total] = await Promise.all([
        this.prisma.paises.findMany({
          where,
          skip: Math.max(0, (page - 1) * limit),
          take: limit,
          orderBy,
          include: {
            ciudades: {
              select: {
                ciudad: true,
                capital: true
              }
            }
          }
        }),
        this.prisma.paises.count({ where })
      ]);

      // Formatear la respuesta
      const formattedPaises = paises.map(pais => ({
        id: pais.id,
        pais: pais.pais,
        ciudades: pais.ciudades
      }));

      // Crear los metadatos
      const meta = {
        limit,
        page,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
        sortColumn: actualSortColumn,
        sortOrder,
        filters: pais ? { pais } : {}
      };

      // Retornar la respuesta formateada
      return formatResponseMessages(
        true,
        formattedPaises.length ? 'Operación exitosa' : 'No se encontraron países',
        formattedPaises,
        null,
        meta
      );
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} paise`;
  }

  update(id: number, updatePaiseDto: UpdatePaiseDto) {
    return `This action updates a #${id} paise`;
  }

  remove(id: number) {
    return `This action removes a #${id} paise`;
  }
}
