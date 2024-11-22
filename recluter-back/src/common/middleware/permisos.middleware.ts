import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request, Response, NextFunction } from 'express';
import { DatabaseErrorService } from '../Error/database-error.service';

interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class PermisosMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService
  ) { }

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    console.log(req.originalUrl, "+++++++++2")
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token no proporcionado');
      }
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.id;

      const user = await this.prisma.usuarios.findFirst({
        where: { id: userId },
        include: {
          tipos_usuarios: {
            include: {
              permisos_tipos_usuarios: {
                include: {
                  permisos: true,
                },
              },
            },
          },
        },
      });

      if (!user) {
        console.log(req.originalUrl, "+++++++++")

        throw new UnauthorizedException('Usuario no encontrado');
      }

      const permissions = user.tipos_usuarios.permisos_tipos_usuarios.map(ptu => ptu.permisos.ruta);

      if (!permissions || permissions.length === 0) {
        throw new ForbiddenException('No tienes permisos suficientes');
      }
      console.log(req.originalUrl, '---url ----------')
     /*  const splitUrl = req.originalUrl.split('/');
      const originalUrl = splitUrl.slice(2).join('/');  */

      const hasPermission = permissions.includes(req.originalUrl);
    /*   console.log(originalUrl, '-url ----------') */
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos suficientes');
      }
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof ForbiddenException) {
        return res.status(error.getStatus()).json({ message: error.message });
      }

      const errorMessage = this.databaseErrorService.handleDBErrorMessage(error);
      return res.status(500).json({ message: 'Error interno del servidor', error: errorMessage });
    }
  }
}