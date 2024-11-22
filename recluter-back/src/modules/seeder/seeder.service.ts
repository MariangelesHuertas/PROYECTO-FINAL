import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTipoUsuarioDto } from '../tipo_usuarios/dto/create-tipo_usuario.dto';
import { faker } from '@faker-js/faker';
import { CreateTipoPermisoDto } from '../tipo_permisos/dto/create-tipo_permiso.dto';
import { CreatePermisoDto } from '../permisos/dto/create-permiso.dto';
import { permisoTipoUsuarioDto } from '../permisos/dto/permiso-tipo_usuario.dto';
import * as bcrypt from 'bcryptjs';
import { CreateEmpresaDto } from '../empresas/dto';
import { CreateSoftSkillDto } from '../soft_skills/dto';
import { CreateAptitudeDto } from '../aptitudes/dto';
import { CreatePalabrasClaveDto } from '../palabras_clave/dto';
import { CreateOfertaDto } from '../ofertas/dto';
import { CreateSectoreDto } from '../sectores/dto';
import { CreateTiposPreguntaDto } from '../tipos_preguntas/dto';
import { CreateKillersQuestionDto } from '../killers_questions/dto';
import { CreateCondicionesKillersQuestionDto } from '../condiciones_killers_questions/dto';
import { CreateDetalleKillersQuestionDto } from '../detalle_killers_questions/dto';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { CreateCarreraDto } from '../carreras/dto';
import { CreateCentrosEducativoDto } from '../centros_educativos/dto';
import { CreateTiposEducacionDto } from '../tipos_educacion/dto';
import { CreateEducacionUsuarioDto } from '../educacion_usuarios/dto';
import { CreateTiposAlertaDto } from '../tipos_alertas/dto';
import { CreateAlertaDto } from '../alertas/dto';
import { CreateIdiomaDto } from '../idiomas/dto/create-idioma.dto';
import { CreateNivelesIdiomaDto } from '../niveles_idiomas/dto/create-niveles_idioma.dto';

@Injectable()
export class SeedService {

  constructor(
    private readonly prisma: PrismaService
  ) { }


  async runSeed() {

    await this.insertNewTipoUsuarios();
    await this.insertPaisesAndCiudades();
    return 'SEED EXECUTED';
  }
  async deleteSeed() {
    await this.prisma.ciudades.deleteMany();
    await this.prisma.paises.deleteMany();

    await this.prisma.alertas_ofertas.deleteMany()

    await this.prisma.palabras_clave_alerta.deleteMany()
    await this.prisma.alertas.deleteMany()
    await this.prisma.tipos_alertas.deleteMany()

    await this.prisma.auditorias.deleteMany()
    await this.prisma.tipos_auditorias.deleteMany()

    await this.prisma.educacion_usuarios.deleteMany()
    await this.prisma.carreras.deleteMany()
    await this.prisma.centros_educativos.deleteMany()
    await this.prisma.tipos_educacion.deleteMany()

    await this.prisma.palabras_clave_oferta.deleteMany()
    await this.prisma.soft_skills_oferta.deleteMany()
    await this.prisma.aptitudes_oferta.deleteMany()
    await this.prisma.condiciones_killers_questions.deleteMany()
    await this.prisma.detalle_killers_questions.deleteMany()

    await this.prisma.killers_questions.deleteMany()
    await this.prisma.tipos_preguntas.deleteMany()

    await this.prisma.palabras_claves.deleteMany()
    await this.prisma.aptitudes.deleteMany()

    await this.prisma.permisos_tipos_usuarios.deleteMany()
    await this.prisma.permisos.deleteMany()
    await this.prisma.tipos_permisos.deleteMany();

    await this.prisma.experiencias_laborales_usuarios.deleteMany();
    await this.prisma.educacion_usuarios.deleteMany();
    await this.prisma.aptitudes_usuarios.deleteMany();
    await this.prisma.idiomas_usuarios.deleteMany();

    await this.prisma.valoraciones_empresas.deleteMany();
    await this.prisma.valoraciones_usuarios.deleteMany();
    await this.prisma.postulaciones_guardadas.deleteMany();
    await this.prisma.postulaciones.deleteMany();
    await this.prisma.ofertas.deleteMany();

    await this.prisma.cvs_usuarios.deleteMany();
    await this.prisma.portafolios_usuario.deleteMany();
    await this.prisma.empresa_seguida.deleteMany();

    await this.prisma.soft_skills.deleteMany();
    await this.prisma.empresas.deleteMany()
    await this.prisma.auditorias.deleteMany();
    await this.prisma.alertas.deleteMany();
    await this.prisma.usuarios.deleteMany();
    await this.prisma.tipos_usuarios.deleteMany();
    await this.prisma.personas.deleteMany()
    await this.prisma.sectores.deleteMany();
    return "SE ELIMINO CORRECTAMENTE"

  }
  async insertPaisesAndCiudades() {

    const paisesData = [
      {
        id: 1,
        pais: "Argentina",
        ciudades: [
          {
            ciudad: "Buenos Aires",
            capital: true
          },
          {
            ciudad: "Córdoba",
            capital: false
          },
          {
            ciudad: "Rosario",
            capital: false
          }
        ]
      },
      {
        id: 2,
        pais: "Brasil",
        ciudades: [
          {
            ciudad: "Brasilia",
            capital: true
          },
          {
            ciudad: "São Paulo",
            capital: false
          },
          {
            ciudad: "Río de Janeiro",
            capital: false
          }
        ]
      },
      {
        id: 3,
        pais: "Chile",
        ciudades: [
          {
            ciudad: "Santiago",
            capital: true
          },
          {
            ciudad: "Valparaíso",
            capital: false
          },
          {
            ciudad: "Concepción",
            capital: false
          }
        ]
      },
      {
        id: 4,
        pais: "Colombia",
        ciudades: [
          {
            ciudad: "Bogotá",
            capital: true
          },
          {
            ciudad: "Medellín",
            capital: false
          },
          {
            ciudad: "Cali",
            capital: false
          }
        ]
      },
      {
        id: 5,
        pais: "México",
        ciudades: [
          {
            ciudad: "Ciudad de México",
            capital: true
          },
          {
            ciudad: "Guadalajara",
            capital: false
          },
          {
            ciudad: "Monterrey",
            capital: false
          }
        ]
      },
      {
        id: 6,
        pais: "Perú",
        ciudades: [
          {
            ciudad: "Lima",
            capital: true
          },
          {
            ciudad: "Arequipa",
            capital: false
          },
          {
            ciudad: "Cusco",
            capital: false
          }
        ]
      },
      {
        id: 7,
        pais: "Venezuela",
        ciudades: [
          {
            ciudad: "Caracas",
            capital: true
          },
          {
            ciudad: "Maracaibo",
            capital: false
          },
          {
            ciudad: "Valencia",
            capital: false
          }
        ]
      },
      {
        id: 8,
        pais: "Ecuador",
        ciudades: [
          {
            ciudad: "Quito",
            capital: true
          },
          {
            ciudad: "Guayaquil",
            capital: false
          },
          {
            ciudad: "Cuenca",
            capital: false
          }
        ]
      },
      {
        id: 9,
        pais: "Bolivia",
        ciudades: [
          {
            ciudad: "Sucre",
            capital: true
          },
          {
            ciudad: "La Paz",
            capital: false
          },
          {
            ciudad: "Cochabamba",
            capital: false
          }
        ]
      },
      {
        id: 10,
        pais: "Uruguay",
        ciudades: [
          {
            ciudad: "Montevideo",
            capital: true
          },
          {
            ciudad: "Salto",
            capital: false
          },
          {
            ciudad: "Paysandú",
            capital: false
          }
        ]
      },
      {
        id: 11,
        pais: "Paraguay",
        ciudades: [
          {
            ciudad: "Asunción",
            capital: true
          },
          {
            ciudad: "Ciudad del Este",
            capital: false
          },
          {
            ciudad: "Encarnación",
            capital: false
          }
        ]
      },
      {
        id: 12,
        pais: "España",
        ciudades: [
          {
            ciudad: "Madrid",
            capital: true
          },
          {
            ciudad: "Barcelona",
            capital: false
          },
          {
            ciudad: "Valencia",
            capital: false
          }
        ]
      },
      {
        id: 13,
        pais: "Francia",
        ciudades: [
          {
            ciudad: "París",
            capital: true
          },
          {
            ciudad: "Marsella",
            capital: false
          },
          {
            ciudad: "Lyon",
            capital: false
          }
        ]
      },
      {
        id: 14,
        pais: "Italia",
        ciudades: [
          {
            ciudad: "Roma",
            capital: true
          },
          {
            ciudad: "Milán",
            capital: false
          },
          {
            ciudad: "Nápoles",
            capital: false
          }
        ]
      },
      {
        id: 15,
        pais: "Alemania",
        ciudades: [
          {
            ciudad: "Berlín",
            capital: true
          },
          {
            ciudad: "Múnich",
            capital: false
          },
          {
            ciudad: "Fráncfort",
            capital: false
          }
        ]
      },
      {
        id: 16,
        pais: "Reino Unido",
        ciudades: [
          {
            ciudad: "Londres",
            capital: true
          },
          {
            ciudad: "Edimburgo",
            capital: false
          },
          {
            ciudad: "Mánchester",
            capital: false
          }
        ]
      },
      {
        id: 17,
        pais: "Canadá",
        ciudades: [
          {
            ciudad: "Ottawa",
            capital: true
          },
          {
            ciudad: "Toronto",
            capital: false
          },
          {
            ciudad: "Vancouver",
            capital: false
          }
        ]
      },
      {
        id: 18,
        pais: "Estados Unidos",
        ciudades: [
          {
            ciudad: "Washington D.C.",
            capital: true
          },
          {
            ciudad: "Nueva York",
            capital: false
          },
          {
            ciudad: "Los Ángeles",
            capital: false
          }
        ]
      },
      {
        id: 19,
        pais: "Australia",
        ciudades: [
          {
            ciudad: "Canberra",
            capital: true
          },
          {
            ciudad: "Sídney",
            capital: false
          },
          {
            ciudad: "Melbourne",
            capital: false
          }
        ]
      },
      {
        id: 20,
        pais: "Nueva Zelanda",
        ciudades: [
          {
            ciudad: "Wellington",
            capital: true
          },
          {
            ciudad: "Auckland",
            capital: false
          },
          {
            ciudad: "Christchurch",
            capital: false
          }
        ]
      },
      {
        id: 21,
        pais: "Japón",
        ciudades: [
          {
            ciudad: "Tokio",
            capital: true
          },
          {
            ciudad: "Osaka",
            capital: false
          },
          {
            ciudad: "Kioto",
            capital: false
          }
        ]
      },
      {
        id: 22,
        pais: "China",
        ciudades: [
          {
            ciudad: "Pekín",
            capital: true
          },
          {
            ciudad: "Shanghái",
            capital: false
          },
          {
            ciudad: "Cantón",
            capital: false
          }
        ]
      },
      {
        id: 23,
        pais: "India",
        ciudades: [
          {
            ciudad: "Nueva Delhi",
            capital: true
          },
          {
            ciudad: "Bombay",
            capital: false
          },
          {
            ciudad: "Bangalore",
            capital: false
          }
        ]
      },
      {
        id: 24,
        pais: "Rusia",
        ciudades: [
          {
            ciudad: "Moscú",
            capital: true
          },
          {
            ciudad: "San Petersburgo",
            capital: false
          },
          {
            ciudad: "Novosibirsk",
            capital: false
          }
        ]
      },
      {
        id: 25,
        pais: "Sudáfrica",
        ciudades: [
          {
            ciudad: "Pretoria",
            capital: true
          },
          {
            ciudad: "Johannesburgo",
            capital: false
          },
          {
            ciudad: "Ciudad del Cabo",
            capital: false
          }
        ]
      },
      {
        id: 26,
        pais: "Egipto",
        ciudades: [
          {
            ciudad: "El Cairo",
            capital: true
          },
          {
            ciudad: "Alejandría",
            capital: false
          },
          {
            ciudad: "Giza",
            capital: false
          }
        ]
      },
      {
        id: 27,
        pais: "Turquía",
        ciudades: [
          {
            ciudad: "Ankara",
            capital: true
          },
          {
            ciudad: "Estambul",
            capital: false
          },
          {
            ciudad: "Izmir",
            capital: false
          }
        ]
      },
      {
        id: 28,
        pais: "Arabia Saudita",
        ciudades: [
          {
            ciudad: "Riad",
            capital: true
          },
          {
            ciudad: "Jeddah",
            capital: false
          },
          {
            ciudad: "Dammam",
            capital: false
          }
        ]
      },
      {
        id: 29,
        pais: "Irán",
        ciudades: [
          {
            ciudad: "Teherán",
            capital: true
          },
          {
            ciudad: "Mashhad",
            capital: false
          },
          {
            ciudad: "Isfahán",
            capital: false
          }
        ]
      },
      {
        id: 30,
        pais: "Indonesia",
        ciudades: [
          {
            ciudad: "Yakarta",
            capital: true
          },
          {
            ciudad: "Surabaya",
            capital: false
          },
          {
            ciudad: "Bandung",
            capital: false
          }
        ]
      },
      {
        id: 31,
        pais: "Pakistán",
        ciudades: [
          {
            ciudad: "Islamabad",
            capital: true
          },
          {
            ciudad: "Karachi",
            capital: false
          },
          {
            ciudad: "Lahore",
            capital: false
          }
        ]
      },
      {
        id: 32,
        pais: "Bangladés",
        ciudades: [
          {
            ciudad: "Daca",
            capital: true
          },
          {
            ciudad: "Chittagong",
            capital: false
          },
          {
            ciudad: "Khulna",
            capital: false
          }
        ]
      },
      {
        id: 33,
        pais: "Tailandia",
        ciudades: [
          {
            ciudad: "Bangkok",
            capital: true
          },
          {
            ciudad: "Chiang Mai",
            capital: false
          },
          {
            ciudad: "Pattaya",
            capital: false
          }
        ]
      },
      {
        id: 34,
        pais: "Vietnam",
        ciudades: [
          {
            ciudad: "Hanoi",
            capital: true
          },
          {
            ciudad: "Ciudad Ho Chi Minh",
            capital: false
          },
          {
            ciudad: "Da Nang",
            capital: false
          }
        ]
      },
      {
        id: 35,
        pais: "Filipinas",
        ciudades: [
          {
            ciudad: "Manila",
            capital: true
          },
          {
            ciudad: "Cebú",
            capital: false
          },
          {
            ciudad: "Dávao",
            capital: false
          }
        ]
      },
      {
        id: 36,
        pais: "Corea del Sur",
        ciudades: [
          {
            ciudad: "Seúl",
            capital: true
          },
          {
            ciudad: "Busan",
            capital: false
          },
          {
            ciudad: "Incheon",
            capital: false
          }
        ]
      },
      {
        id: 37,
        pais: "Corea del Norte",
        ciudades: [
          {
            ciudad: "Pionyang",
            capital: true
          },
          {
            ciudad: "Hamgyong",
            capital: false
          },
          {
            ciudad: "Chagang",
            capital: false
          }
        ]
      },
      {
        id: 38,
        pais: "Malasia",
        ciudades: [
          {
            ciudad: "Kuala Lumpur",
            capital: true
          },
          {
            ciudad: "George Town",
            capital: false
          },
          {
            ciudad: "Ipoh",
            capital: false
          }
        ]
      },
      {
        id: 39,
        pais: "Singapur",
        ciudades: [
          {
            ciudad: "Singapur",
            capital: true
          }
        ]
      },
      {
        id: 40,
        pais: "Tayikistán",
        ciudades: [
          {
            ciudad: "Dusambé",
            capital: true
          },
          {
            ciudad: "Khujand",
            capital: false
          },
          {
            ciudad: "Kulob",
            capital: false
          }
        ]
      },
      {
        id: 41,
        pais: "Uzbekistán",
        ciudades: [
          {
            ciudad: "Tashkent",
            capital: true
          },
          {
            ciudad: "Samarcanda",
            capital: false
          },
          {
            ciudad: "Bujará",
            capital: false
          }
        ]
      },
      {
        id: 42,
        pais: "Kazajistán",
        ciudades: [
          {
            ciudad: "Nursultán",
            capital: true
          },
          {
            ciudad: "Almatý",
            capital: false
          },
          {
            ciudad: "Shymkent",
            capital: false
          }
        ]
      },
      {
        id: 43,
        pais: "Kuwait",
        ciudades: [
          {
            ciudad: "Kuwait",
            capital: true
          }
        ]
      },
      {
        id: 44,
        pais: "Emiratos Árabes Unidos",
        ciudades: [
          {
            ciudad: "Abu Dabi",
            capital: true
          },
          {
            ciudad: "Dubái",
            capital: false
          },
          {
            ciudad: "Sharjah",
            capital: false
          }
        ]
      },
      {
        id: 45,
        pais: "Israel",
        ciudades: [
          {
            ciudad: "Jerusalén",
            capital: true
          },
          {
            ciudad: "Tel Aviv",
            capital: false
          },
          {
            ciudad: "Haifa",
            capital: false
          }
        ]
      },
      {
        id: 46,
        pais: "Líbano",
        ciudades: [
          {
            ciudad: "Beirut",
            capital: true
          },
          {
            ciudad: "Trípoli",
            capital: false
          },
          {
            ciudad: "Sidón",
            capital: false
          }
        ]
      },
      {
        id: 47,
        pais: "Jordania",
        ciudades: [
          {
            ciudad: "Amán",
            capital: true
          },
          {
            ciudad: "Zarqa",
            capital: false
          },
          {
            ciudad: "Irbid",
            capital: false
          }
        ]
      },
      {
        id: 48,
        pais: "Siria",
        ciudades: [
          {
            ciudad: "Damasco",
            capital: true
          },
          {
            ciudad: "Alepo",
            capital: false
          },
          {
            ciudad: "Homs",
            capital: false
          }
        ]
      },
      {
        id: 49,
        pais: "Iraq",
        ciudades: [
          {
            ciudad: "Bagdad",
            capital: true
          },
          {
            ciudad: "Basora",
            capital: false
          },
          {
            ciudad: "Mosul",
            capital: false
          }
        ]
      },
      {
        id: 50,
        pais: "Afganistán",
        ciudades: [
          {
            ciudad: "Kabul",
            capital: true
          },
          {
            ciudad: "Herat",
            capital: false
          },
          {
            ciudad: "Kandahar",
            capital: false
          }
        ]
      }
    ];

    for (const paisData of paisesData) {
      const pais = await this.prisma.paises.create({
        data: {
          id: paisData.id,
          pais: paisData.pais,
        },
      });

      for (const ciudadData of paisData.ciudades) {
        await this.prisma.ciudades.create({
          data: {
            pais_id: pais.id,
            ciudad: ciudadData.ciudad,
            capital: ciudadData.capital
          },
        });
      }
    }
  }

  async insertNewTipoUsuarios() {

    await this.deleteSeed();

    //CREACION DE 10--- TIPO_USUARIO #####################################
    const tipoUsuarios = [
      { id: 1, tipo_usuario: 'Administrador' },
      { id: 2, tipo_usuario: 'Candidato' },
      { id: 3, tipo_usuario: 'Empresa' },
      { id: 4, tipo_usuario: 'Prueba' },
    ];

    const listCreateTypeUsers = [];
    for (const tipoUsuario of tipoUsuarios) {
      const objeto = await this.prisma.tipos_usuarios.create({
        data: { id: tipoUsuario.id, tipo_usuario: tipoUsuario.tipo_usuario }
      });
      //UNIR
      listCreateTypeUsers.push(objeto)
    }

    const tipoPermisos: CreateTipoPermisoDto[] = [
      { tipo: 'Empleo' },
      { tipo: 'Empresas' },
      { tipo: 'Mis Candidaturas' },
      { tipo: 'Mi Portal' },
      { tipo: 'Panel Control' },
      { tipo: 'Buscar CV' },
      { tipo: 'Ofertas' },
    ];

    const listCreateTipoPermiso = [];
    for (const tipoPermiso of tipoPermisos) {
      const objeto = await this.prisma.tipos_permisos.create({
        data: tipoPermiso,
      });
      listCreateTipoPermiso.push(objeto);
    }

    const permisos: CreatePermisoDto[] = [
      { tipo_permiso_id: listCreateTipoPermiso[0].id, slug: 'show.candidate.module.employment', descripcion: "Mostrar el módulo de Empleo", ruta: '/' },
      { tipo_permiso_id: listCreateTipoPermiso[1].id, slug: 'show.candidate.module.enterprises', descripcion: "Mostrar el módulo de Empresas", ruta: '/' },
      { tipo_permiso_id: listCreateTipoPermiso[2].id, slug: 'show.candidate.module.my-applications', descripcion: "Mostrar el módulo de Mis Candidaturas", ruta: '/' },
      { tipo_permiso_id: listCreateTipoPermiso[3].id, slug: 'show.candidate.module.my-portal', descripcion: "Mostrar el módulo de Mi Portal", ruta: '/' },
      { tipo_permiso_id: listCreateTipoPermiso[4].id, slug: 'show.enterprise.module.control-panel', descripcion: "Mostrar el módulo de Panel de Control", ruta: '/' },
      { tipo_permiso_id: listCreateTipoPermiso[5].id, slug: 'show.enterprise.module.search-cv', descripcion: "Mostrar el módulo de Buscar CV", ruta: '/' },
      { tipo_permiso_id: listCreateTipoPermiso[6].id, slug: 'show.enterprise.module.offers', descripcion: "Mostrar el módulo de Ofertas", ruta: '/' }
    ];

    const listCreatePermiso = []
    for (const permiso of permisos) {
      const objeto = await this.prisma.permisos.create({
        data: permiso,
      });
      //UNIR
      listCreatePermiso.push(objeto)
    }

    // CREACION DE PERMISO_TIPO_USUARIO ########################################33
    const permisoUsuarios: permisoTipoUsuarioDto[] = [
      { permiso_id: listCreatePermiso[0].id, tipo_usuario_id: listCreateTypeUsers[1].id },
      { permiso_id: listCreatePermiso[1].id, tipo_usuario_id: listCreateTypeUsers[1].id },
      { permiso_id: listCreatePermiso[2].id, tipo_usuario_id: listCreateTypeUsers[1].id },
      { permiso_id: listCreatePermiso[3].id, tipo_usuario_id: listCreateTypeUsers[1].id },

      { permiso_id: listCreatePermiso[4].id, tipo_usuario_id: listCreateTypeUsers[2].id },
      { permiso_id: listCreatePermiso[5].id, tipo_usuario_id: listCreateTypeUsers[2].id },
      { permiso_id: listCreatePermiso[6].id, tipo_usuario_id: listCreateTypeUsers[2].id },
    ];

    listCreatePermiso.map((permiso) => {
      permisoUsuarios.push({
        permiso_id: permiso.id,
        tipo_usuario_id: listCreateTypeUsers[0].id,
      });
    })

    for (const permisoUsuario of permisoUsuarios) {
      const objeto = await this.prisma.permisos_tipos_usuarios.create({
        data: permisoUsuario,
      });
      listCreatePermiso.push(objeto)
    }

    // Generar 50 personas y usuarios ##########################################
    const listaUsuarios = []
    const listaUsuarios_empresas = []
    for (let i = 1; i <= 50; i++) {

      let id_tipo_usuario = listCreateTypeUsers[0].id
      if (i > 10 && i <= 30) {
        id_tipo_usuario = listCreateTypeUsers[1].id
      } else if (i > 30) {
        id_tipo_usuario = listCreateTypeUsers[2].id
      }

      const nombre = faker.lorem.sentence().slice(0, 6);
      const apellidoPaterno = faker.lorem.sentence().slice(0, 7)
      const apellidoMaterno = faker.lorem.sentence().slice(0, 8)
      const persona = await this.prisma.personas.create({
        data: {
          nombre,
          apellido_paterno: apellidoPaterno,
          apellido_materno: apellidoMaterno,
        },
      });
      const contrasenaEnTextoPlano = `usuario${i}`;
      const contrasenaEncriptada = await bcrypt.hash(contrasenaEnTextoPlano, 10);
      const usuario = await this.prisma.usuarios.create({
        data: {
          usuario: `usuario${i}`,
          contrasena: contrasenaEncriptada,
          persona_id: persona.id,
          email: `usuario${i}@gmail.com`,
          estado: "confirmacion",
          tipo_usuario_id: id_tipo_usuario,
          codigo_generado: 12345,
          cargo: faker.helpers.arrayElement(['cargo1', 'cargo2', 'cargo3', 'cargo4']),
          meses_experiencia: faker.helpers.arrayElement([1, 2, 3, 4]),
          ubicacion: `ubicacion - calle ${i + 1}`,
          link_valoracion: `val-${i}`
        },
      });

      if (i > 0 && i <= 10) {
        listaUsuarios_empresas.push(usuario);
      } else if (i > 30) {
        listaUsuarios_empresas.push(usuario);
      }

      listaUsuarios.push(usuario)
    }
    // Generar 20 Sectore _-------------------------------------------------------------------------------------------------------
    const sectores: CreateSectoreDto[] = [];
    for (let i = 0; i < 20; i++) {
      sectores.push({
        sector: faker.lorem.sentence().slice(0, 5),
      });
    }
    const listCreateSectores = []
    for (const sector of sectores) {
      const objeto = await this.prisma.sectores.create({
        data: sector,
      });
      // UNIR-SECTORES
      listCreateSectores.push(objeto)
    }

    const empresas: any[] = [];
    listaUsuarios_empresas.map((usuario) => {
      empresas.push({
        usuario_id: usuario.id,
        sector_id: listCreateSectores[Math.floor(Math.random() * listCreateSectores.length)].id,
        empresa: faker.lorem.sentence().slice(0, 15),
        logo: faker.lorem.sentence().slice(0, 15),

        banner: faker.lorem.sentence().slice(0, 15),
        pagina_web: faker.lorem.sentence().slice(0, 15),

        sede_fiscal: faker.lorem.sentence().slice(0, 15),
        tamanio: faker.lorem.sentence().slice(0, 15),
        descripcion: faker.lorem.sentence().slice(0, 15),

      });
    })

    const listCreateEmpresas = []
    for (const empresa of empresas) {
      const objeto = await this.prisma.empresas.create({
        data: empresa,
      });
      // UNIR-EMPRESAS
      listCreateEmpresas.push(objeto)
    }

    // Generar 50 soft-skills
    const softSkills: CreateSoftSkillDto[] = [
      { soft_skill: 'Colaborativo', aprobado: true },
      { soft_skill: 'Innovador', aprobado: true },
      { soft_skill: 'Detallista', aprobado: true },
      { soft_skill: 'Resiliente', aprobado: true },
      { soft_skill: 'Adaptable', aprobado: true },
    ];

    const listCreateSoftSkills = []
    for (const skill of softSkills) {
      const objeto = await this.prisma.soft_skills.create({
        data: skill,
      });
      listCreateSoftSkills.push(objeto)
    }

    // Generar 50 Aptitudes
    const aptitudes: CreateAptitudeDto[] = [];
    for (let i = 0; i < 50; i++) {
      aptitudes.push({
        aptitud: faker.lorem.sentence().slice(0, 6),
        aprobado: true

      });
    }

    const listCreateAptitudes = []
    for (const aptitud of aptitudes) {
      const objeto = await this.prisma.aptitudes.create({
        data: aptitud,
      });
      listCreateAptitudes.push(objeto)
    }

    // Generar 50 Palabras-clave
    const palabras: CreatePalabrasClaveDto[] = [];
    for (let i = 0; i < 50; i++) {
      palabras.push({
        palabra: faker.lorem.sentence().slice(0, 6),
        aprobado: true

      });
    }

    const listCreatepalabras = []
    for (const palabra of palabras) {
      const objeto = await this.prisma.palabras_claves.create({
        data: palabra,
      });
      listCreatepalabras.push(objeto)
    }

    // Generar 100 ofertas -------------------------------------------------------------------------------------------------------
    const ofertas: any[] = [];
    for (let i = 0; i < 50; i++) {
      ofertas.push({
        empresa_id: listCreateEmpresas[Math.floor(Math.random() * listCreateEmpresas.length)].id,
        sector_id: listCreateSectores[Math.floor(Math.random() * listCreateSectores.length)].id,
        cargo: faker.lorem.words(4),
        descripcion: faker.lorem.paragraph(),
        tipo: faker.helpers.arrayElement(['tipo1', 'tipo2', 'tipo3', 'tipo4']),
        ubi_provincia: faker.lorem.sentence().slice(0, 6),
        ubi_poblacion: faker.lorem.sentence().slice(0, 6),
        sal_min: parseFloat(faker.helpers.arrayElement(['500', '1000', '30'])),
        sal_max: parseFloat(faker.helpers.arrayElement(['500', '1000', '30'])),
        abanico_salarial: faker.helpers.arrayElement(['a', 'b', 'c']),
        anios_experiencia: Math.floor(Math.random() * 10),
        estudios_minimos: faker.helpers.arrayElement(['estudio1', 'estudio2', 'estudio3', 'estudio4', 'estadui5']),
        tipo_contrato: faker.helpers.arrayElement(['contrato1', 'contrato2', 'contrato3']),
        jornada_laboral: faker.helpers.arrayElement(['jornada1', 'jornada2', 'jornada3', 'jornada4']),
      });
    }
    const listCreateOfertas = []
    for (const oferta of ofertas) {
      const objeto = await this.prisma.ofertas.create({
        data: oferta,
      });
      // UNIR-OFERTAS
      listCreateOfertas.push(objeto)
    }

    // Generar 20 Sectore _-------------------------------------------------------------------------------------------------------
    const tipos_pregunta: CreateTiposPreguntaDto[] = [
      { id: 1, nombre_tipo: "Margen numérico", tipo: "numerico" },
      { id: 2, nombre_tipo: "Escala lineal", tipo: "lineal" },
      { id: 3, nombre_tipo: "Elegir opción", tipo: "radio" },
      { id: 4, nombre_tipo: "Respuesta personalizada", tipo: "respuesta" },
      { id: 5, nombre_tipo: "Diferentes casillas", tipo: "checkbox" },
    ];
    // for (let i = 0; i < 20; i++) {
    //   tipos_pregunta.push({
    //     nombre_tipo: faker.lorem.sentence().slice(0, 5),
    //     tipo: faker.lorem.sentence().slice(0, 5),

    //   });
    // }
    const listCreateTipos_pregunta = []
    for (const tipo of tipos_pregunta) {
      const objeto = await this.prisma.tipos_preguntas.create({
        data: tipo,
      });
      // UNIR-tipos_pregunta
      listCreateTipos_pregunta.push(objeto)
    }
    // Generar 50 Killers_questions -------------------------------------------------------------------------------------------------------
    const killers_questions: CreateKillersQuestionDto[] = [];
    for (let i = 0; i < 50; i++) {
      killers_questions.push({
        oferta_id: listCreateOfertas[Math.floor(Math.random() * listCreateOfertas.length)].id,
        tipo_pregunta_id: listCreateTipos_pregunta[Math.floor(Math.random() * listCreateTipos_pregunta.length)].id,
        pregunta: faker.lorem.paragraph(),
      });
    }
    const listCreateKillerQuestions = []
    for (const killer of killers_questions) {
      const objeto = await this.prisma.killers_questions.create({
        data: killer,
      });
      // UNIR-KillerQuestions
      listCreateKillerQuestions.push(objeto)
    }
    // Generar 50 Condition-Killers_questions -------------------------------------------------------------------------------------------------------
    const condi_killers_questions: CreateCondicionesKillersQuestionDto[] = [];
    for (let i = 0; i < 50; i++) {
      condi_killers_questions.push({
        killer_question_id: listCreateKillerQuestions[Math.floor(Math.random() * listCreateKillerQuestions.length)].id,
        minimo: faker.helpers.arrayElement([Math.floor(Math.random() * 100)]),
        maximo: faker.helpers.arrayElement([Math.floor(Math.random() * 100)]),
        valor: faker.lorem.sentence().slice(0, 4)

      });
    }
    const listCreateConKillerQuestions = []
    for (const con_killer of condi_killers_questions) {
      const objeto = await this.prisma.condiciones_killers_questions.create({
        data: con_killer,
      });
      // UNIR-KillerQuestions
      listCreateConKillerQuestions.push(objeto)
    }
    // Generar 50 Detalle-Killers_questions -------------------------------------------------------------------------------------------------------
    const deta_killers_questions: CreateDetalleKillersQuestionDto[] = [];
    for (let i = 0; i < 50; i++) {
      deta_killers_questions.push({
        killer_question_id: listCreateOfertas[Math.floor(Math.random() * listCreateOfertas.length)].id,
        detalle: faker.lorem.sentence().slice(0, 8),
        correcto: faker.helpers.arrayElement([true, false])

      });
    }
    const listCreateDetaKillerQuestions = []
    for (const deta_killer of deta_killers_questions) {
      const objeto = await this.prisma.detalle_killers_questions.create({
        data: deta_killer,
      });
      // UNIR-DetaKillerQuestions
      listCreateDetaKillerQuestions.push(objeto)
    }

    // Generar 20 carreras _-------------------------------------------------------------------------------------------------------
    const carreras: CreateCarreraDto[] = [];
    for (let i = 0; i < 20; i++) {
      carreras.push({
        carrera: faker.lorem.sentence().slice(0, 5),
      });
    }
    const listCreateCarreras = []
    for (const carrera of carreras) {
      const objeto = await this.prisma.carreras.create({
        data: carrera,
      });

      listCreateCarreras.push(objeto)
    }

    // Generar 20 centros_educativos _-------------------------------------------------------------------------------------------------------
    const centros: CreateCentrosEducativoDto[] = [];
    for (let i = 0; i < 20; i++) {
      centros.push({
        centro_educativo: faker.lorem.sentence().slice(0, 5),
        ubicacion: faker.lorem.sentence().slice(0, 5),
      });
    }
    const listCentrosEducativos = []
    for (const centro of centros) {
      const objeto = await this.prisma.centros_educativos.create({
        data: centro,
      });

      listCentrosEducativos.push(objeto)
    }

    // Generar 20 tipo_educacion _-------------------------------------------------------------------------------------------------------
    const tipo_educacion: any = [{
      id: 1, tipo_educacion: "Bachiller"
    }];

    for (let i = 0; i < 20; i++) {
      tipo_educacion.push({
        tipo_educacion: faker.lorem.sentence().slice(0, 5),
      });
    }

    const listTiposEducacion = []
    for (const educacion of tipo_educacion) {
      const objeto = await this.prisma.tipos_educacion.create({
        data: educacion,
      });
      listTiposEducacion.push(objeto)
    }

    // Generar 50 Educacion-Usuarios -------------------------------------------------------------------------------------------------------
    const educacion_usuarios: any[] = [];
    for (let i = 0; i < 300; i++) {
      educacion_usuarios.push({
        tipo_educacion_id: listTiposEducacion[Math.floor(Math.random() * listTiposEducacion.length)].id,
        centro_educativo_id: listCentrosEducativos[Math.floor(Math.random() * listCentrosEducativos.length)].id,
        usuario_id: listaUsuarios[Math.floor(Math.random() * listaUsuarios.length)].id,
        carrera_id: listCreateCarreras[Math.floor(Math.random() * listCreateCarreras.length)].id,
        fecha_inicio: new Date('2024-12-31T00:00:00Z'),
        fecha_final: new Date('2024-12-31T00:00:00Z'),
        nombre_centro_educativo: faker.lorem.sentence().slice(0, 5),
        carrera: faker.lorem.sentence().slice(0, 5),
        ubicacion: faker.lorem.sentence().slice(0, 5),
      });
    }
    const listCreateEducacionUsuarios = []
    for (const educacion of educacion_usuarios) {
      const objeto = await this.prisma.educacion_usuarios.create({
        data: educacion,
      });

      listCreateEducacionUsuarios.push(objeto)
    }

    // Una auditoria -------------------------------------------------------------------------------------------------------
    await this.prisma.tipos_auditorias.create({
      data: {
        nombre: "test-auditoria"
      },
    });

    // Un tipo_alerta  -------------------------------------------------------------------------------------------------------
    const id_tipos_alerta = await this.prisma.tipos_alertas.create({
      data: {
        tipo: "Puesto de trabajo"
      },
    });
    // Generar 50 Tipos-Alertas -------------------------------------------------------------------------------------------------------
    const alertas: any[] = [];
    for (let i = 0; i < 50; i++) {
      alertas.push({
        tipo_alerta_id: id_tipos_alerta.id,
        usuario_id: listaUsuarios[Math.floor(Math.random() * listaUsuarios.length)].id,
        nombre: faker.lorem.words(2),
        cargo: faker.lorem.words(4),
        temporalidad: faker.lorem.sentence().slice(0, 5),
        activa: true
      });
    }
    const listCreateAlertas = []
    for (const alerta of alertas) {
      const objeto = await this.prisma.alertas.create({
        data: alerta,

      });

      listCreateAlertas.push(objeto)
    }


    // ------------------------------

    /*  */
    // Generar idiomas -------------------------------------------------------------------------------------------------------
    const idiomas: CreateIdiomaDto[] = [
      { idioma: "Español" },
      { idioma: "Ingles" },
      { idioma: "Frances" },
      { idioma: "Italiano" },
      { idioma: "Portuguese" },
    ];

    const listCreateIdiomas = []
    for (const idioma of idiomas) {
      const objeto = await this.prisma.idiomas.create({
        data: idioma,
      });
      listCreateIdiomas.push(objeto)
    }

    // Generar Niveles-Idiomas -------------------------------------------------------------------------------------------------------
    const nivelesIdiomas: CreateNivelesIdiomaDto[] = [
      { idioma_id: listCreateIdiomas[0].id, nivel: 'Nativo' },
      { idioma_id: listCreateIdiomas[0].id, nivel: 'Basico' },
      { idioma_id: listCreateIdiomas[0].id, nivel: 'Intermedio' },
      { idioma_id: listCreateIdiomas[0].id, nivel: 'Avanzado' },

      { idioma_id: listCreateIdiomas[1].id, nivel: 'Nativo' },
      { idioma_id: listCreateIdiomas[1].id, nivel: 'Basico' },
      { idioma_id: listCreateIdiomas[1].id, nivel: 'Intermedio' },
      { idioma_id: listCreateIdiomas[1].id, nivel: 'Avanzado' },

      { idioma_id: listCreateIdiomas[2].id, nivel: 'Nativo' },
      { idioma_id: listCreateIdiomas[2].id, nivel: 'Basico' },
      { idioma_id: listCreateIdiomas[2].id, nivel: 'Intermedio' },
      { idioma_id: listCreateIdiomas[2].id, nivel: 'Avanzado' },

      { idioma_id: listCreateIdiomas[3].id, nivel: 'Nativo' },
      { idioma_id: listCreateIdiomas[3].id, nivel: 'Basico' },
      { idioma_id: listCreateIdiomas[3].id, nivel: 'Intermedio' },
      { idioma_id: listCreateIdiomas[3].id, nivel: 'Avanzado' },

      { idioma_id: listCreateIdiomas[4].id, nivel: 'Nativo' },
      { idioma_id: listCreateIdiomas[4].id, nivel: 'Basico' },
      { idioma_id: listCreateIdiomas[4].id, nivel: 'Intermedio' },
      { idioma_id: listCreateIdiomas[4].id, nivel: 'Avanzado' },
    ];

    const listCreateNivelesIdiomas = []
    for (const nivel of nivelesIdiomas) {
      const objeto = await this.prisma.niveles_idiomas.create({
        data: nivel,
      });
      listCreateNivelesIdiomas.push(objeto)
    }

    // Generar 300 APTITUDES_USUARIOS -------------------------------------------------------------------------------------------------------
    const aptitutes_usuarios: any[] = [];

    for (let i = 0; i < 300; i++) {
      aptitutes_usuarios.push({
        aptitud_id: listCreateAptitudes[Math.floor(Math.random() * listCreateAptitudes.length)].id,
        usuario_id: listaUsuarios[Math.floor(Math.random() * listaUsuarios.length)].id,
      });
    }

    const listaCreateAptitudes_usuarios = [];

    for (const aptitud_usuario of aptitutes_usuarios) {
      const objeto = await this.prisma.aptitudes_usuarios.upsert({
        where: {
          usuario_id_aptitud_id: {
            usuario_id: aptitud_usuario.usuario_id,
            aptitud_id: aptitud_usuario.aptitud_id
          }
        },
        update: {},
        create: aptitud_usuario
      });

      listaCreateAptitudes_usuarios.push(objeto);
    }

    // Generar 300 IDIOMAS_USUARIOS-------------------------------------------------------------------------------------------------------
    const idiomas_usuarios: any[] = [];
    for (let i = 0; i < 300; i++) {
      idiomas_usuarios.push({
        nivel_idioma_id: listCreateNivelesIdiomas[Math.floor(Math.random() * listCreateNivelesIdiomas.length)].id,
        usuario_id: listaUsuarios[Math.floor(Math.random() * listaUsuarios.length)].id,
      });
    }
    const listaCreateIdiomas_usuarios = []
    for (const idiomas_usuario of idiomas_usuarios) {
      const objeto = await this.prisma.idiomas_usuarios.create({
        data: idiomas_usuario,
      });
      listaCreateIdiomas_usuarios.push(objeto)
    }


    // Generar 300 Experiencas-laborales_usuarios -------------------------------------------------------------------------------------------------------
    const experiencia_usuarios: any[] = [];
    for (let i = 0; i < 300; i++) {
      experiencia_usuarios.push({
        empresa_id: listCreateEmpresas[Math.floor(Math.random() * listCreateEmpresas.length)].id,
        usuario_id: listaUsuarios[Math.floor(Math.random() * listaUsuarios.length)].id,
        sector_id: listCreateSectores[Math.floor(Math.random() * listCreateSectores.length)].id,
        cargo: faker.helpers.arrayElement(['cargo1', 'cargo2', 'cargo3', 'cargo4']),
        descripcion: faker.lorem.sentence().slice(0, 10),
        nombre_empresa: faker.lorem.sentence().slice(0, 10),
        nombre_sector: faker.lorem.sentence().slice(0, 10),
        fecha_inicio: new Date('2024-12-31T00:00:00Z'),
        fecha_fin: new Date('2024-12-31T00:00:00Z'),
        meses_experiencia: 0
      });
    }

    const listaCreateExperienciaUsuarios = []
    for (const experiencia_usuario of experiencia_usuarios) {
      const objeto = await this.prisma.experiencias_laborales_usuarios.create({
        data: experiencia_usuario,
      });
      listaCreateExperienciaUsuarios.push(objeto)
    }


    // Generar 300 VALORACIONES_USUARIOS-------------------------------------------------------------------------------------------------------
    const valoraciones_usuarios: any[] = [];

    // Generar 300 registros aleatorios de valoraciones_usuarios
    for (let i = 0; i < 300; i++) {
      const usuario1 = listaUsuarios[Math.floor(Math.random() * listaUsuarios.length)].id;
      const usuario2 = listaUsuarios[Math.floor(Math.random() * listaUsuarios.length)].id;

      // Asegurarse de que usuario1 y usuario2 no sean iguales (si es necesario)
      if (usuario1 !== usuario2) {
        valoraciones_usuarios.push({
          usuarios: usuario2,  // Calificador
          usuario_id: usuario1, // Calificado
          valoracion: faker.helpers.arrayElement([1, 2, 3, 4, 5]), // Valor de la valoración
        });
      }
    }
    // -------------------


    const listaCreateValoracionesUsuarios = [];

    // Crear o actualizar registros en la base de datos
    for (const valoraciones_usuario of valoraciones_usuarios) {
      try {
        const objeto = await this.prisma.valoraciones_usuarios.upsert({
          where: {
            usuario_id_usuarios: {
              usuario_id: valoraciones_usuario.usuario_id,
              usuarios: valoraciones_usuario.usuarios
            }
          },
          update: {
            valoracion: valoraciones_usuario.valoracion // Actualiza el valor si ya existe
          },
          create: valoraciones_usuario // Crea si no existe
        });

        listaCreateValoracionesUsuarios.push(objeto);
      } catch (error) {
        console.error('Error al crear o actualizar valoraciones_usuarios:', error);
      }
    }
    // Generar 300 CVS_USAURIOS -------------------------------------------------------------------------------------------------------
    const cvs_usuarios: any[] = [];
    for (let i = 0; i < listaUsuarios.length; i++) {
      cvs_usuarios.push({
        usuario_id: i + 1,
        nombre: faker.lorem.sentence().slice(0, 10),
        nombre_archivo: faker.lorem.sentence().slice(0, 20),
        cv: faker.lorem.sentence().slice(0, 10),
        default: true

      });
    }
    for (let i = 0; i < listaUsuarios.length; i++) {
      cvs_usuarios.push({
        usuario_id: i + 1,
        nombre: faker.lorem.sentence().slice(0, 10),
        nombre_archivo: faker.lorem.sentence().slice(0, 20),
        cv: faker.lorem.sentence().slice(0, 10),
        default: false
      });
    }

    //CREACION DE 10--- TIPO_FASE_POSTULACION#####################################
    const fase_postulacion: any[] = [
      { fase: 'Descartado', prioridad: 1 },
      { fase: 'Preseleccionado', prioridad: 2 },
      { fase: 'Entrevista', prioridad: 3 },
      { fase: 'Seleccionado', prioridad: 4, seleccionado: true }
    ];

    for (const fase of fase_postulacion) {
      const objeto = await this.prisma.fases_postulaciones.create({
        data: fase,
      });
    }

    // const listaCreateCvsUsuarios = []
    // for (const cvs_usuario of cvs_usuarios) {
    //   const objeto = await this.prisma.cvs_usuarios.create({
    //     data: cvs_usuario,
    //   });
    //   listaCreateCvsUsuarios.push(objeto)
    // }
  }
}