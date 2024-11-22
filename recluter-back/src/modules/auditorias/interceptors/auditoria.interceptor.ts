import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditoriaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    //console.log(request.body, "¿¿¿¿¿¿¿¿¿¿¿¿")
    const xForwardedFor = request.headers['ip'];
    const ip = typeof xForwardedFor === 'string' ? xForwardedFor.split(',')[0].trim() : request.connection.remoteAddress || 'Unknown IP';

    request['ipAddress'] = ip;

    delete request.body.ip
    const authAuthorization = request.headers.authorization;
    request['authAuthorization'] = authAuthorization;
    return next.handle().pipe(
      tap(async (data) => {
      }),
    );
  }
}
