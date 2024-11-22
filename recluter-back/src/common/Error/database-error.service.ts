import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { formatResponseMessages } from './interfaces/response.interface';

@Injectable()
export class DatabaseErrorService {
  private logger: Logger;

  setLoggerContext(context: string) {
    this.logger = new Logger(context);
  }

  public handleDBErrorMessage(error: any): string {
    if (error.code === 'P2002') {
      this.logger.error(error);
      return 'Falla de restriccion unica en el/los campo(s): ' + error.meta.target;
    } else if (error.code === 'P2025') {
      this.logger.error(error);
      return 'Registro no encontrado';
    } else if (error.code === 'P2003') {
      this.logger.error(error);
      return 'Falla de restriccion de clave foranea';
    } else if (error.code === 'P2009') {
      this.logger.error(error);
      return 'Error de validación de consulta';
    } else if (error.status === 404) { 
      this.logger.error(error);
      return 'Recurso no encontrado';
    } else if (error.name === 'TokenExpiredError') { 
      this.logger.error(error);
      return 'El token JWT ha expirado, por favor inicia sesión nuevamente :) ';
    } else {
      this.logger.error(error);
      return 'Error, verifica el codigo';
    }
  }
  public getExceptionBasedOnMessage(error: any, message: string) {
    if (error instanceof NotFoundException) {
      return new NotFoundException(formatResponseMessages(false, "404 - No se encontró el registro", [], message));
    }
    if (error instanceof BadRequestException) {
      return new BadRequestException(formatResponseMessages(false, "400 - Solicitud incorrecta", [], message));
    }
    if (error instanceof ForbiddenException) {
      return new ForbiddenException(formatResponseMessages(false, "403 - Acceso denegado", [], message));
    }
    if (error instanceof UnauthorizedException) {
      return new UnauthorizedException(formatResponseMessages(false, "401 - No autorizado", [], message));
    }
    if (error instanceof ConflictException) {
      return new ConflictException(formatResponseMessages(false, "409 - Conflicto en la solicitud", [], message));
    }
    if (error instanceof InternalServerErrorException) {
      return new InternalServerErrorException(formatResponseMessages(false, "500 - Error interno del servidor", [], message));
    }
    if (error instanceof UnprocessableEntityException) {
      return new UnprocessableEntityException(formatResponseMessages(false, "422 - Entidad no procesable", [], message));
    }
    if (error.name === 'TokenExpiredError') {  
      return new UnauthorizedException(formatResponseMessages(false, "401 - El token ha expirado", [], message));
    }
    
    return new BadRequestException(formatResponseMessages(false, "400 - Error", [], message));
  }
  
  public handleDBErrorMessage2(error: any): string {
    if (error.code === 'P2002') {
      this.logger.error(error);
      return 'Unique constraint failed on the field(s): ' + error.meta.target;
    } else if (error.code === 'P2025') {
      this.logger.error(error);
      return 'Record not found';
    } else if (error.code === 'P2003') {
      this.logger.error(error);
      return 'Foreign key constraint failed';
    } else if (error.code === 'P2009') {
      this.logger.error(error);
      return 'Query validation error';
    } else {
      this.logger.error(error);
      return "Error, verifica el código"; 
    }
  }
  
}
