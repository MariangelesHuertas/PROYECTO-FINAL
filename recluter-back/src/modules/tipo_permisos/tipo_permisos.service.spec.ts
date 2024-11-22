import { PrismaService } from "../../prisma/prisma.service";
import { TipoPermisosService } from "./tipo_permisos.service";
import { DatabaseErrorService } from "../..//common/Error/database-error.service";
import { Test } from "@nestjs/testing";
import { formatResponseMessages, ResponseFormat } from "../../common/Error/interfaces/response.interface";
import { Request } from 'express';
import { AuditoriasModule } from "../auditorias/auditorias.module";

describe('TiposPermisosService', () => {
    let prismaService: PrismaService;
    let tipoPermisosService: TipoPermisosService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AuditoriasModule],
            providers: [
                
                PrismaService,
                DatabaseErrorService, {
                    provide: TipoPermisosService,
                    useValue: {
                      create: jest.fn(),
                      update: jest.fn(),
                    }
                  }],
            
        }).compile();
        tipoPermisosService = moduleRef.get<TipoPermisosService>(TipoPermisosService);
        prismaService = moduleRef.get<PrismaService>(PrismaService);
    });
    const name = "TIPO_PERMISO-svc"
    const objeto = {
        id: 31,
        tipo: "administrador5",
        createdAt: "2024-07-10T04:18:52.316Z",
        updatedAt: "2024-07-10T04:18:52.316Z"
    };
    const request = {
        authAuthorization: 'Bearer token123', 
        ipAddress: '127.0.0.1', 
        url: '/api/url', 
      } as unknown as Request;
    describe('create', () => {
        it(`should create a new ${name}`, async () => {
            const { tipo, ...rest } = objeto
            const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
            jest.spyOn(tipoPermisosService, 'create').mockResolvedValue(responseFormat);
            const result = await tipoPermisosService.create({ tipo }  , request);
            expect(result).toEqual(responseFormat);
        });
    });
    describe('update', () => {
        it(`should update an  exiting ${name}`, async () => {
            const { id, tipo, ...rest } = objeto
            const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
            jest.spyOn(tipoPermisosService, 'update').mockResolvedValue(responseFormat);
            const result = await tipoPermisosService.update(objeto.id, { tipo }, request)
            expect(result).toEqual(responseFormat);
        });
    });

})