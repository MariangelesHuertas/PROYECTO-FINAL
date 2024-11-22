import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { MessageValidationEmail } from './dto/message-validation-email.dto'
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(mensaje:MessageValidationEmail) {
    console.log(mensaje)
    try {
      return await this.mailerService.sendMail({
        to: 'cesar.pacho.cabbage@gmail.com',
        subject: mensaje.asunto,
        template: 'plantilla', 
        context: {
          mensaje:mensaje.mensaje,
          codigo_verificacion:mensaje.codigo_verificacin,
          name_usuario:mensaje.nombre_usuario
        },
      });
    } catch (error) {
      throw new Error('Error al enviar');
    }
  }
}
