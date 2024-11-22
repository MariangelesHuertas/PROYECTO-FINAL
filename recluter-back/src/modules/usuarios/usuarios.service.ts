import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { formatResponseMessages, formatResponseObjectMessages } from '../../common/Error/interfaces/response.interface';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { JwtPayload } from './interface/payload';
import { PaginationUsuarioDto } from './dto/pagination-usuario.dto';
import { EmailService } from '../../email/email.service';
import { MessageValidationEmail } from '../../email/dto/message-validation-email.dto';
import { ValidationCode } from './dto/validation-codigo.dto';
import { AuditoriaInterfaz } from '../../modules/auditorias/interface/auditorias.interface';

import { Request } from 'express';
import { AuditoriasService } from '../../modules/auditorias/auditorias.service';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { TipoImagen, UsuarioImagen } from './interface/usuarioImagen.interface';
import * as path from 'path';

import { promises as fs } from 'fs';
import { UsuarioImagenBannerInterface, UsuarioImagenInterface } from './interface/updateUsuarioImage.interface';
import { UpdateFieldSobreMi } from './dto/update-field-sobreMi.dto';
import { csvUsuarioInterface } from '../cvs_usuarios/interface/csvUsuario.interface';
import { ConfigService } from '@nestjs/config';
import { updateFieldLinkValoracion } from './dto/update-link_valoracion';
import { UpdateUserProfileDto } from './dto/user-profile.dto';
import { updateFieldJornadaModalidad } from './dto/update-field-jornadaModalida.dto';
const name = "- Usuario -"
@Injectable()
export class UsuariosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly auditoriaService: AuditoriasService,
    private configService: ConfigService
  ) { }

  onModuleInit() {
    this.databaseErrorService.setLoggerContext(UsuariosService.name)
  }

  async create(createUsuarioDto: CreateUsuarioDto, request: Request, tipoUser: string = "Candidatos") {
    let tipo = tipoUser
    try {
      const { nombre, apellido_paterno, apellido_materno, usuario, contrasena, email } = createUsuarioDto
      const existingUsuario = await this.prisma.usuarios.findFirst({
        where: {
          OR: [
            // {
            //   usuario: {
            //     equals: usuario,
            //     //mode: 'insensitive',
            //   },
            // },
            {
              email: {
                equals: email,
                //mode: 'insensitive',
              },
            },
          ],
        },
      });
      if (existingUsuario) {
        throw new ConflictException(formatResponseMessages(false, 'El usuario ya existe', []));
      }
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const tipoUsuario = await this.switchTipoUser(tipo)
      const result = await this.prisma.$transaction(async (prisma) => {
        const persona = await prisma.personas.create({
          data: {
            nombre,
            apellido_paterno,
            apellido_materno,
          },
        });
        const usuarioCreado = await prisma.usuarios.create({
          data: {
            usuario,
            contrasena: hashedPassword,
            email,
            tipo_usuario_id: tipoUsuario.id,
            persona_id: persona.id,
            estado: "confirmar",
            codigo_generado: 0,
            link_valoracion: `link_${1000 + persona.id}`,/*  Esto es temporal  , AUN NO SE QUE DEBERIA IR AQUI */
            cargo: createUsuarioDto.cargo,
            pais_id: createUsuarioDto.pais_id,
          },
        });

        console.log({ ...usuarioCreado, ...persona })
        const resultado = { ...usuarioCreado, nombrePersona: persona.nombre }
        return resultado;
      });

      let codigo;
      let codigoExiste;
      do {
        codigo = Math.floor(100000 + Math.random() * 900000);
        const busqueda = await this.prisma.usuarios.findFirst({
          where: {
            codigo_generado: {
              in: [codigo]
            }
          }
        });
        codigoExiste = !!busqueda;
      } while (codigoExiste);

      const update = await this.prisma.usuarios.update({
        where: { id: result.id },
        data: { codigo_generado: codigo }
      });

      // const mensaje: MessageValidationEmail = {
      //   asunto: "Verificacion de correo , Recluter",
      //   email: update.email,
      //   codigo_verificacin: update.codigo_generado,
      //   mensaje: `Hola ${result.nombrePersona} , te enviamos este codigo para validar tu indentidad`,
      //   nombre_usuario: result.nombrePersona
      // };
      // this.emailService.sendEmail(mensaje);


      const logeo = await this.login({ usuario: email, contrasena }, request)
      console.log("logeo: --");
      console.log(logeo);

      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: logeo.data[0].token,
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(""),
        descripcion: `Creamos una ${name}`,
        accion: 1,
        ruta: request.url,
        log: "",
        tabla: `${name}`,
        pk_actualizado: logeo.data[0].user.id
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, 'Operacion Exitosa', [{ ...result, token: logeo.data[0].token }]);


    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      console.log("mensaje antes ", message, error)
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }

  async switchTipoUser(tipoUser: string) {
    let tipoUsuario;
    if (tipoUser === "Administrador") {
      tipoUsuario = await this.prisma.tipos_usuarios.findFirst({
        where: { tipo_usuario: "Administrador" }
      });

    }

    if (tipoUser === "Candidatos") {
      tipoUsuario = await this.prisma.tipos_usuarios.findFirst({
        where: { tipo_usuario: "Candidato" }
      });

    }

    if (tipoUser === "Empresas") {
      tipoUsuario = await this.prisma.tipos_usuarios.findFirst({
        where: { tipo_usuario: "Empresa" }
      });

    }

    if (tipoUser === "prueba") {
      tipoUsuario = await this.prisma.tipos_usuarios.findFirst({
        where: { tipo_usuario: "Prueba" }
      });

    }
    if (tipoUsuario) {
      return tipoUsuario
    } else {
      console.log("finalizo")
      // Si no encuentra coincidencia en los condicionales anteriores, crea uno nuevo
      tipoUsuario = await this.prisma.tipos_usuarios.create({
        data: { tipo_usuario: tipoUser }
      });

      console.log("se ha creado satis ----", tipoUsuario);
      return tipoUsuario
    }


  }

  async findAll(paginationUsuario: PaginationUsuarioDto) {
    const { limit = 10, page = 1, usuario, sortColumn = 'id', sortOrder = 'asc' } = paginationUsuario;
    try {
      const where: any = {
        AND: [
          usuario ? {
            usuario: {
              contains: usuario,
              mode: 'insensitive',
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: 'asc' | 'desc' } = {};
      orderBy[sortColumn] = sortOrder;
      const usuarios = await this.prisma.usuarios.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy,
        include: {
          personas: true,
        },
      });
      const total = await this.prisma.usuarios.count()

      const meta = {
        limit: limit,
        page: page,
        total,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      if (usuarios.length === 0) {
        return formatResponseMessages(true, 'No se encontraron permisos', []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', usuarios, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  findOne(id: number) {

    try {
      const result = this.prisma.usuarios.findFirst({
        where: {
          id
        }
      })
      return result
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto, request: Request) {
    console.log("llego aqui update", id)
    try {
      const { 
        nombre, 
        apellido_paterno, 
        apellido_materno,
        usuario, contrasena, 
        tipo_usuario_id,
        cargo: cargo,
        pais_id: pais_id,
      } = updateUsuarioDto;

      const existingUsuario = await this.prisma.usuarios.findUnique({
        where: { id },
        include: { personas: true },
      });

      if (!existingUsuario) {
        throw new NotFoundException(formatResponseMessages(false, "Este codigo no existe en la db", []));
      }

      const hashedPassword = contrasena ? await bcrypt.hash(contrasena, 10) : existingUsuario.contrasena;

      const result = await this.prisma.$transaction(async (prisma) => {
        const updatedPersona = await prisma.personas.update({
          where: { id: existingUsuario.persona_id },
          data: {
            nombre,
            apellido_paterno,
            apellido_materno,
          },
        });

        const updatedUsuario = await prisma.usuarios.update({
          where: { id },
          data: {
            usuario,
            contrasena: hashedPassword,
            tipo_usuario_id,
            cargo,
            pais_id,

          },
        });

        return updatedUsuario;
      });
      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(existingUsuario),
        descripcion: `Actualizamos una ${name}`,
        accion: 2,
        ruta: request.url,
        log: "",
        tabla: `${name}`,
        pk_actualizado: result.id
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, 'Operacion Exitosa', [result]);
    } catch (error) {

      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async login(loginDto: LoginDto, request: Request) {
    try {
      const { usuario, contrasena } = loginDto
      console.log("loginDto: --");
      console.log(loginDto);

      const user = await this.prisma.usuarios.findFirst({
        where: {
          email: usuario,
          OR: [
            { tipo_usuario_id: 1 },
            { tipo_usuario_id: 2 },
            { tipo_usuario_id: 3 },
          ]
        },
        include: {
          personas: true
        }
      })

      if (!user) {
        console.log("No existe el usuario");
        throw new UnauthorizedException("credenciales no validas")
      }
      if (!bcrypt.compareSync(contrasena, user.contrasena)) {
        throw new UnauthorizedException("credenciales no son validas")
      }

      const { contrasena: _, ...rest } = user
      const userJson = JSON.parse(JSON.stringify(rest))
      const tokenGenerado = this.getJwtToken({ id: userJson.id })

      const updateToken = await this.prisma.usuarios.update({
        where: { id: user.id },
        data: {
          token: tokenGenerado
        }
      })

      // const envio: AuditoriaInterfaz = {
      //   tipo_auditoria_id: 1,
      //   user_token: tokenGenerado,
      //   ip: request['ipAddress'],
      //   jsonentrada: JSON.stringify(user),
      //   jsonsalida: JSON.stringify(""),
      //   descripcion: `el usuario  ha iniciado sesión ${name}`,
      //   accion: "login",
      //   ruta: request.url,
      //   log: "",
      //   tabla: `${name}`,
      //   pk_actualizado: userJson.id
      // }
      // this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, 'Operacion Exitosa', [{
        user: userJson,
        token: tokenGenerado
      }]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      console.log("Login error");
      console.log(error);

      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token
  }

  async validateCode(validation: ValidationCode, request: Request) {
    try {
      const busqueda = await this.prisma.usuarios.findFirst({
        where: {
          estado: "confirmar",
          codigo_generado: validation.codigo_verificacion
        }
      })
      if (busqueda) {
        const result = await this.prisma.usuarios.update({
          where: { id: busqueda.id },
          data: { estado: "activo", codigo_generado: 0 }
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(busqueda),
          descripcion: `validamos el codigo enviado al correo ${name}`,
          accion: 2,
          ruta: request.url,
          log: "",
          tabla: `${name}`,
          pk_actualizado: result.id
        }
        this.auditoriaService.logAuditoria(envio)
        return formatResponseMessages(true, 'Operacion Exitosa', [result]);

      } else {
        throw new NotFoundException(formatResponseMessages(true, "El codigo de verificacion no coincide", []))
      }
    } catch (error) {

      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findByEmail(email: string) {
    const result = this.prisma.usuarios.findFirst({
      where: {
        email: email
      }
    })
    return result
    /*  return this.prisma.usuarios.findUnique({
       where: { e },
     }); */
  }

  async createF(userData: any) {
    const tipoUsuario = await this.prisma.tipos_usuarios.findFirst({
      where: { tipo_usuario: "cliente" }
    })

    const result = await this.prisma.$transaction(async (prisma) => {
      const persona = await prisma.personas.create({
        data: {
          nombre: userData.firstName,
          apellido_paterno: userData.lastName,

        },
      });
      const usuarioCreado = await prisma.usuarios.create({
        data: {
          email: userData.email,
          tipo_usuario_id: tipoUsuario.id,
          persona_id: persona.id,
          estado: "activo",
          facebookId: userData.facebookId,
          link_valoracion: `link ${userData.googleId}`,
          pais_id: userData.pais_id,
          cargo: userData.cargo
        },
      });

      console.log({ ...usuarioCreado, ...persona })
      const resultado = { ...usuarioCreado, nombrePersona: persona.nombre }
      return resultado;
    });
    return result
  }

  async createG(userData: any , tipo:string) {
    const tipoUsuario = await this.prisma.tipos_usuarios.findFirst({
      where: { tipo_usuario: tipo }
    })

    const result = await this.prisma.$transaction(async (prisma) => {
      const persona = await prisma.personas.create({
        data: {
          nombre: userData.firstName,
          apellido_paterno: userData.lastName,

        },
      });
      const usuarioCreado = await prisma.usuarios.create({
        data: {
          email: userData.email,
          tipo_usuario_id: tipoUsuario.id,
          persona_id: persona.id,
          estado: "activo",
          googleId: userData.googleId,
          link_valoracion: `link ${userData.googleId}`
        },
      });

      console.log({ ...usuarioCreado, ...persona })
      const resultado = { ...usuarioCreado, nombrePersona: persona.nombre }
      return resultado;
    });
    return result
  }

  async validateToken(parametros: ValidateTokenDto, request: Request) {

    const { token } = parametros
    try {
      const result = await this.prisma.usuarios.findFirst({
        where: { token },
        include: {
          personas: true,
          empresas: {
            take: 1
          }
        }
      }) as {
        id: number;
        email: string;
        contrasena: string;
        tipo_usuario_id: number;
        empresa?: any;
        empresas?: any[];
      } | null;

      if (!result) {
        return formatResponseMessages(false, 'El token proporcionado no existe en la tabla Usuarios', []);
      }

      if (result && result.empresas.length > 0) {
        result.empresa = result.empresas[0];
        delete result.empresas;
      }

      const tokenGenerado = this.getJwtToken({ id: String(result.id) })

      const updateToken = await this.prisma.usuarios.update({
        where: { id: result.id },
        data: {
          token: tokenGenerado
        }
      })

      const { contrasena, token: _, ...rest } = updateToken;

      return formatResponseMessages(true, 'Operacion Exitosa', [{
        user: result,
        token: tokenGenerado
      }]);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async store(imagen: UsuarioImagen): Promise<string> {
    let ruta = imagen.descripcion === TipoImagen.IMAGEN ? '/storage/usuarios/imagen/' : '/storage/usuarios/banner/';
    console.log('imagen2:', imagen)
    const filePath = path.normalize(process.cwd() + ruta + imagen.nombre + path.extname(imagen.archivo.originalname));
    await fs.writeFile(filePath, imagen.archivo.buffer);

    const baseUrl = this.configService.get<string>('URL') || 'http://localhost:3005';
    
    const url = `${baseUrl}${ruta}${imagen.nombre}${path.extname(imagen.archivo.originalname)}`
    return url;
  }

  async updateImagen(userId: number, imagen: UsuarioImagenInterface, request: Request) {
    console.log("llego aqui 3", imagen)
    const result = await this.prisma.usuarios.update({
      where: {
        id: userId
      },
      data: {
        imagen: imagen.imagen
      }
    })
    return result
  }

  async updateProfile(user: any, dataProfile: UpdateUserProfileDto, request: Request) {

    const person = await this.prisma.personas.update({
      where: {
        id: user.persona_id
      },
      data: {
        nombre: dataProfile.nombre,
        apellido_paterno: dataProfile.apellido_paterno,
        apellido_materno: dataProfile.apellido_materno,
      }
    })
    const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
    await this.prisma.usuarios.update({
      where: {
        id: userId
      },
      data: {
        jornada: dataProfile.jornada,
        modalidad: dataProfile.modalidad
      }
    })

    return formatResponseObjectMessages(true, "Operacion Exitosa", person)
  }

  async updateImagenBanner(userId: number, imagen: UsuarioImagenBannerInterface, request: Request) {
    console.log("imagen: ---");
    console.log(imagen);

    const result = await this.prisma.usuarios.update({
      where: {
        id: userId
      },
      data: {
        imagen_banner: imagen.imagen_banner
      }
    })
    return result
  }

  async updateFieldSobreMi(update: UpdateFieldSobreMi, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.usuarios.update({
        where: {
          id: userId
        },
        data: {
          sobreMi: update.sobreMi
        }
      })
      const { contrasena: _, ...rest } = result
      return formatResponseMessages(true, 'Operacion Exitosa', [rest]);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }

  async updateFieldLinkValoracion(update: updateFieldLinkValoracion, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.usuarios.update({
        where: {
          id: userId
        },
        data: {
          link_valoracion: update.link_valoracion
        }
      })
      const { contrasena: _, ...rest } = result
      return formatResponseMessages(true, 'Operacion Exitosa', [rest]);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }
  async updateFieldJornadaAndModalidad(update: updateFieldJornadaModalidad, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.usuarios.update({
        where: {
          id: userId
        },
        data: {
          jornada:update.jornada,
          modalidad:update.modalidad
        }
      })
      const { contrasena: _, ...rest } = result
      return formatResponseMessages(true, 'Operacion Exitosa', [rest]);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

}
