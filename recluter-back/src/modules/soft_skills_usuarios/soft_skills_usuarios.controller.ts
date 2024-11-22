import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SoftSkillsUsuariosService } from './soft_skills_usuarios.service';
import { CreateSoftSkillsUsuarioDto } from './dto/create-soft_skills_usuario.dto';
import { UpdateSoftSkillsUsuarioDto } from './dto/update-soft_skills_usuario.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerCountResponse, SwaggerSkillUsuarioDto } from './dto/swagger-soft_skills_oferta.dto';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';
const name = "- Soft-skills-Usuario - "
@ApiTags("Endpoints - Soft-skills-Usuario")
@Controller('soft-skills-usuarios')
export class SoftSkillsUsuariosController {
  constructor(private readonly softSkillsUsuariosService: SoftSkillsUsuariosService) {}

  @Post('CreateSoftUsuario')
  @ApiOperation({ summary: 'Devuelve el numero de registros insertados' })
  @ApiResponse({ status: 201, description: 'Devuelve el numero de registros insertados', type: SwaggerCountResponse })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  createOrUpdateSkillOferta(@Body() skillOferta:CreateSoftSkillsUsuarioDto, @Req() request: Request) {
   console.log("llego")
    return this.softSkillsUsuariosService.createOrUpdateSkillOferta(skillOferta, request)
  }
  @Get('findAllByUsuarioToken')
  @ApiOperation({ summary: 'Devuelve el los registros vinculados al ID_USUARIO - se obtiene por el TOKEN' })
  @ApiResponse({ status: 201, description: 'Devuelve el los registros vinculados al ID_USUARIO', type: SwaggerSkillUsuarioDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  findAllByUsuarioToken( @Req() request: Request){
    return this.softSkillsUsuariosService.findAllByUsuarioToken(request)
  } 

  @Get('findAllByUsuario/:idUsuario')
  @ApiOperation({ summary: 'Devuelve el los registros vinculados al ID_USUARIO' })
  @ApiResponse({ status: 201, description: 'Devuelve el los registros vinculados al ID_USUARIO', type: SwaggerSkillUsuarioDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'idUsuario', required: true, type: String, description: `Ingresa el ID ${name}` })
  findAllByUsuario(@Param('idUsuario') idUsuario: string ){
    return this.softSkillsUsuariosService.findAllByUsuario(+idUsuario)
  } 
}
