import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PermisosModule } from './modules/permisos/permisos.module';
import { TipoPermisosModule } from './modules/tipo_permisos/tipo_permisos.module';
import { PrismaModule } from './prisma/prisma.module';
import { TipoUsuariosModule } from './modules/tipo_usuarios/tipo_usuarios.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { CommonModule } from './common/common.module';
import { AptitudesOfertaModule } from './modules/aptitudes_oferta/aptitudes_oferta.module';
import { AptitudesModule } from './modules/aptitudes/aptitudes.module';
import { PalabrasClaveModule } from './modules/palabras_clave/palabras_clave.module';
import { OfertasModule } from './modules/ofertas/ofertas.module';
import { PalabrasClaveOfertaModule } from './modules/palabras_clave_oferta/palabras_clave_oferta.module';
import { SoftSkillsOfertaModule } from './modules/soft_skills_oferta/soft_skills_oferta.module';
import { SoftSkillsModule } from './modules/soft_skills/soft_skills.module';
import { EmpresasModule } from './modules/empresas/empresas.module';

import { EmailModule } from './email/email.module';
import { MailerModule} from '@nestjs-modules/mailer';
import { KillersQuestionsModule } from './modules/killers_questions/killers_questions.module';
import { TiposPreguntasModule } from './modules/tipos_preguntas/tipos_preguntas.module';
import { CondicionesKillersQuestionsModule } from './modules/condiciones_killers_questions/condiciones_killers_questions.module';
import { DetalleKillersQuestionsModule } from './modules/detalle_killers_questions/detalle_killers_questions.module';
import { SectoresModule } from './modules/sectores/sectores.module';
import { PostulacionesGuardadasModule } from './modules/postulaciones_guardadas/postulaciones_guardadas.module';
import { ValoracionesEmpresasModule } from './modules/valoraciones_empresas/valoraciones_empresas.module';
import { ValoracionesUsuariosModule } from './modules/valoraciones_usuarios/valoraciones_usuarios.module';
import { PostulacionesModule } from './modules/postulaciones/postulaciones.module';
import { AptitudesUsuariosModule } from './modules/aptitudes_usuarios/aptitudes_usuarios.module';
import { ExperienciasLaboralesUsuariosModule } from './modules/experiencias_laborales_usuarios/experiencias_laborales_usuarios.module';
import { CentrosEducativosModule } from './modules/centros_educativos/centros_educativos.module';
import { CarrerasModule } from './modules/carreras/carreras.module';
import { TiposEducacionModule } from './modules/tipos_educacion/tipos_educacion.module';
import { EducacionUsuariosModule } from './modules/educacion_usuarios/educacion_usuarios.module';
import { AuditoriasModule } from './modules/auditorias/auditorias.module';
import { TiposAuditoriasModule } from './modules/tipos_auditorias/tipos_auditorias.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditoriaInterceptor } from './modules/auditorias/interceptors/auditoria.interceptor';
import { AuditoriasService } from './modules/auditorias/auditorias.service';
import { PalabrasClaveAlertasModule } from './modules/palabras_clave_alertas/palabras_clave_alertas.module';
import { AlertasModule } from './modules/alertas/alertas.module';
import { TiposAlertasModule } from './modules/tipos_alertas/tipos_alertas.module';
import { AlertasOfertasModule } from './modules/alertas_ofertas/alertas_ofertas.module';
import { SoftSkillsUsuariosModule } from './modules/soft_skills_usuarios/soft_skills_usuarios.module';
import { IdiomasModule } from './modules/idiomas/idiomas.module';
import { NivelesIdiomasModule } from './modules/niveles_idiomas/niveles_idiomas.module';
import { IdiomasUsuariosModule } from './modules/idiomas_usuarios/idiomas_usuarios.module';
import { PortafoliosUsuariosModule } from './modules/portafolios_usuarios/portafolios_usuarios.module';
import { CvsUsuariosModule } from './modules/cvs_usuarios/cvs_usuarios.module';
import { EmpresasSeguidasModule } from './modules/empresas_seguidas/empresas_seguidas.module';
import { CvGeneralModule } from './modules/cv_general/cv_general.module';
import { DashboardModule } from './modules/panel_control/dashboard/dashboard.module';
import { FasesPostulacionesModule } from './modules/fases_postulaciones/fases_postulaciones.module';
import { SoftSkillsPortafoliosModule } from './modules/soft_skills_portafolios/soft_skills_portafolios.module';
import { ArchivosPortafolioModule } from './modules/archivos_portafolio/archivos_portafolio.module';
import { PaisesModule } from './modules/paises/paises.module';
import { CiudadesModule } from './modules/ciudades/ciudades.module';
import { RecomendacionesModule } from './modules/recomendaciones/recomendaciones.module';
@Module({
  imports: [
    ConfigModule.forRoot(), 
    PermisosModule, 
    TipoPermisosModule, 
    PrismaModule,  
    TipoUsuariosModule, 
    UsuariosModule, 
    SeederModule, 
    CommonModule, 
    AptitudesOfertaModule, 
    AptitudesModule, 
    PalabrasClaveModule, 
    OfertasModule, 
    PalabrasClaveOfertaModule, 
    SoftSkillsOfertaModule, 
    SoftSkillsModule, 
    EmpresasModule ,
    EmailModule,
    MailerModule,
    KillersQuestionsModule,
    TiposPreguntasModule,
    CondicionesKillersQuestionsModule,
    DetalleKillersQuestionsModule,
    SectoresModule,
    PostulacionesModule,
    PostulacionesGuardadasModule,
    ValoracionesEmpresasModule,
    ValoracionesUsuariosModule,
    ExperienciasLaboralesUsuariosModule,
    AptitudesUsuariosModule,
    CarrerasModule,
    CentrosEducativosModule,
    TiposEducacionModule,
    EducacionUsuariosModule,
    AuditoriasModule,
    TiposAuditoriasModule,
    PalabrasClaveAlertasModule,
    AlertasModule,
    TiposAlertasModule,
    AlertasOfertasModule,
    SoftSkillsUsuariosModule,
    IdiomasModule,
    NivelesIdiomasModule,
    IdiomasUsuariosModule,
    PortafoliosUsuariosModule,
    CvsUsuariosModule,
    EmpresasSeguidasModule,
    CvGeneralModule,
    DashboardModule,
    FasesPostulacionesModule,
    SoftSkillsPortafoliosModule,
    ArchivosPortafolioModule,
    PaisesModule,
    CiudadesModule,
    RecomendacionesModule
  ],
  exports:[ConfigModule],
  controllers: [AppController],
  providers: [AppService , AuditoriasService  ,{
    provide: APP_INTERCEPTOR,
    useClass: AuditoriaInterceptor,
  },],
})
export class AppModule {
   /* configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PermisosMiddleware)
      .exclude(
        { path: 'usuarios', method: RequestMethod.POST },
        { path: 'usuarios', method: RequestMethod.POST },
        { path: 'seed', method: RequestMethod.GET },

      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  } */
}
