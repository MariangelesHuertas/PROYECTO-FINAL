import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req, UseGuards, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerUsuarioDto } from './dto/swagger-usuario.dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { SwaggerLoginResponseDto } from './dto/swagger-response-login.dto';
import { PaginationUsuarioDto } from './dto/pagination-usuario.dto';
import { ValidationCode } from './dto/validation-codigo.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UsuarioImagenDto } from './dto/usuarioImage.dto';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { TipoImagen } from './interface/usuarioImagen.interface';
import { UsuarioImagenBannerDto } from './dto/usuarioImageBanner.dto';
import { UpdateFieldSobreMi } from './dto/update-field-sobreMi.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateCsvUsuarioDto } from '../cvs_usuarios/dto/create-csv-usuario.dto';
import { csvUsuarioInterface } from '../cvs_usuarios/interface/csvUsuario.interface';
import { updateFieldLinkValoracion } from './dto/update-link_valoracion';
import { SwaggerUpdateUser } from './dto/swagger/swagger-update-user.dto';
import { UpdateUserProfileDto } from './dto/user-profile.dto';
import { updateFieldJornadaModalidad } from './dto/update-field-jornadaModalida.dto';

const name = "- Usuarios - "
@ApiTags('Endpoints - Usuarios')
@Controller('auth')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService, private readonly auditoriaService: AuditoriasService) { }

  /* ==============================================================================================================>>>>>>>>>< */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.handleAuthRedirect(req, res);
  }

  @Get('googleEmpresa')
  @UseGuards(AuthGuard('googleEmpresa'))
  googleEmpresaAuth() { }

  @Get('google/callback/empresa')
  @UseGuards(AuthGuard('googleEmpresa'))
  googleAuthEmpresasRedirect(@Req() req, @Res() res) {
    return this.handleAuthRedirect(req, res);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuth() { }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req, @Res() res) {
    return this.handleAuthRedirect(req, res);
  }

  private handleAuthRedirect(req, res) {
    const token = req.user.token;
    const id_user = req.user.user.id;
    const frontendRedirectUrl = `${process.env.URL_CLIENT}/auth/google/callback?token=${token}&id_user=${id_user}`;

    res.redirect(frontendRedirectUrl);
  }
  /* ==============================================================================================================>>>>>>>>>< */

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerUsuarioDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createUsuarioDto: CreateUsuarioDto, @Req() request: Request) {
    return this.usuariosService.create(createUsuarioDto, request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name} ` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Usuarios', type: [SwaggerUsuarioDto] })
  @ApiResponse({ status: 400, description: 'Error al obtener json', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - usuario/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'usuario', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginationUsuario: PaginationUsuarioDto) {
    return this.usuariosService.findAll(paginationUsuario);
  }

  /*  @Get(':id')
   findOne(@Param('id') id: string) {
     return this.usuariosService.findOne(+id);
   } */

  @Put('update/:id')
  @ApiOperation({ summary: 'Actualizar Usuarios y Personas' })
  @ApiResponse({ status: 200, description: 'Devuelve el nombre del usuario actualizado', type: SwaggerUsuarioDto })
  @ApiResponse({ status: 400, description: 'No se encontro el tipo_usuario_id', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto, @Req() request: Request) {
    return this.usuariosService.update(+id, updateUsuarioDto, request);
  }

  @Put('update-profile')
  @ApiOperation({ summary: 'Actualizar Usuarios y Personas' })
  @ApiResponse({ status: 200, description: 'Devuelve el nombre del usuario actualizado', type: SwaggerUpdateUser })
  @ApiResponse({ status: 400, description: 'No se encontro el tipo_usuario_id', type: SwaggerResponseFormatDto })
  async updateProfile(@Body() dataProfile: UpdateUserProfileDto, @Req() request: Request) {
    const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
    const usuario = await this.usuariosService.findOne(userId);
    if (!usuario) {
      throw new Error('usuario no encontrado');
    }
    return this.usuariosService.updateProfile(usuario, dataProfile, request);
  }
  /*   @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usuariosService.remove(+id);
    } */
  @Post('/login')
  @ApiOperation({ summary: 'Logear Usuario' })
  @ApiResponse({ status: 201, description: 'Devuelve el nombre del usuario logeado', type: SwaggerLoginResponseDto })
  @ApiResponse({ status: 400, description: 'Error al inisiar sesion', type: SwaggerLoginResponseDto })
  login(@Body() loginDto: LoginDto, @Req() request: Request) {
    return this.usuariosService.login(loginDto, request)
  }

  @Post('/validateCode')
  @ApiOperation({ summary: 'Validar codigo' })
  @ApiResponse({ status: 201, description: 'Devuleve el usuario con el estado cambiado', type: ValidationCode })
  @ApiResponse({ status: 400, description: 'Codigo invalido', type: SwaggerLoginResponseDto })
  validateCode(@Body() validate: ValidationCode, @Req() request: Request) {
    return this.usuariosService.validateCode(validate, request)
  }

  @Post('/validateToken')
  @ApiOperation({ summary: 'Validar Token y generar uno nuevo para un usuario' })
  @ApiResponse({ status: 201, description: 'Devuleve el usuario con un nuevo token', type: ValidationCode })
  @ApiResponse({ status: 400, description: 'Codigo invalido', type: SwaggerLoginResponseDto })
  @ApiQuery({ name: 'token', required: false, type: String, description: 'ingresa el token' })
  validateToken(@Body() validate: ValidateTokenDto, @Req() request: Request) {
    return this.usuariosService.validateToken(validate, request)
  }



  @Put('uploadImagen')
  @ApiOperation({ summary: 'Actualizamos la IMAGEN del usuario  , el usuario se obtiene por el token , usar el formData y pasale el campo "imagen" ' })
  @ApiResponse({ status: 200, description: 'Devuelve el nombre del usuario actualizado' })
  @ApiResponse({ status: 400, description: 'No se encontro el tipo_usuario_id' })
  @ApiBody({
    description: 'Imagen  para el usuario',
    schema: {
      type: 'object',
      properties: {
        imagen_banner: {
          type: 'string',
          format: 'binary',
        }
      },
      required: ['imagen_banner'],
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imagen' },
    ])
  )
  async uploadImage(@UploadedFiles() archivos: UsuarioImagenDto, @Req() request: Request) {
    const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
    const usuario = await this.usuariosService.findOne(userId);
    if (!usuario) {
      throw new Error('usuario no encontrado');
    }
    const imagen = archivos?.imagen && archivos.imagen.length > 0
      ? await this.usuariosService.store({
        nombre: `${userId}_imagen`,
        descripcion: TipoImagen.IMAGEN,
        archivo: archivos.imagen[0],
      })
      : usuario.imagen;
    return this.usuariosService.updateImagen(+userId, { imagen }, request
    );
  }


  @Put('uploadImagenBanner')
  @ApiOperation({ summary: 'Actualizamos la IMAGEN BANNER del usuario  , el usuario se obtiene por el token , usar el formData y pasale el campo "imagen_banner" ' })
  @ApiResponse({ status: 200, description: 'Devuelve el nombre del usuario actualizado' })
  @ApiResponse({ status: 400, description: 'No se encontro el tipo_usuario_id' })
  @ApiBody({
    description: 'Imagen de banner para el usuario',
    schema: {
      type: 'object',
      properties: {
        imagen_banner: {
          type: 'string',
          format: 'binary',
        }
      },
      required: ['imagen_banner'],
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imagen_banner' },
    ])
  )
  async uploadImageBanner(@UploadedFiles() archivos: UsuarioImagenBannerDto, @Req() request: Request) {
    const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
    const usuario = await this.usuariosService.findOne(userId);
    if (!usuario) {
      throw new Error('usuario no encontrado');
    }
    const imagen_banner = archivos?.imagen_banner && archivos.imagen_banner.length > 0
      ? await this.usuariosService.store({
        nombre: `${userId}_imagen_banner`,
        descripcion: TipoImagen.IMAGEN_BANNER,
        archivo: archivos.imagen_banner[0],
      })
      : usuario.imagen_banner;

    return this.usuariosService.updateImagenBanner(+userId, { imagen_banner }, request
    );
  }


  @Patch('/updateFieldSobreMi')
  @ApiOperation({ summary: 'Actualizar el campo SobreMi  , el usuario se obtiene por el TOKEN' })
  @ApiResponse({ status: 201, description: 'Devuelve un susario con el objeto actualizado', type: UpdateFieldSobreMi })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerLoginResponseDto })
  updateFieldSobreMi(@Body() validate: UpdateFieldSobreMi, @Req() request: Request) {
    return this.usuariosService.updateFieldSobreMi(validate, request)
  }
  @Patch('/updateFieldLinkValoracion')
  @ApiOperation({ summary: 'Actualizar el campo link de valoracion  , el usuario se obtiene por el TOKEN' })
  @ApiResponse({ status: 201, description: 'Devuelve un susario con el objeto actualizado', type: UpdateFieldSobreMi })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerLoginResponseDto })
  updateFieldLinkValoracion(@Body() validate: updateFieldLinkValoracion, @Req() request: Request) {
    return this.usuariosService.updateFieldLinkValoracion(validate, request)
  }
  
  @Patch('/updateFieldJornadaAndModalidad')
  @ApiOperation({ summary: 'Actualizar el ccampo modalidad y jornada , el usuario se obtiene por el TOKEN' })
  @ApiResponse({ status: 201, description: 'Devuelve un susario con el objeto actualizado', type: UpdateFieldSobreMi })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerLoginResponseDto })
  updateFieldJornadaAndModalidad(@Body() validate: updateFieldJornadaModalidad, @Req() request: Request) {
    return this.usuariosService.updateFieldJornadaAndModalidad(validate, request)
  }
  /*  @Get('findAllUsersByCandidatos')
   @ApiOperation({ summary: `Devuelve una lista de usuarios` })
   @ApiResponse({ status: 200, description: 'Devuelve una lista de Aptitudes'})
   @ApiResponse({ status: 400, description: 'Error al hacer la consulta'})
   
   indAllUsersByCandidatos(@Query() paginate:PaginationTiposEducacinoDto) {
     return this.tiposEducacionService.findAll(paginate);
   } */

}
