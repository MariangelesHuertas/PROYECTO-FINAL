import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessageValidationEmail } from './dto/message-validation-email.dto';


@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-email')
  async sendEmail(@Body() body:MessageValidationEmail) {
    try {
      await this.emailService.sendEmail(body);
      return { message: 'Correo enviado correctamente' };
    } catch (error) {
      return { message: 'Error al enviar el correo' };
    }
  }
}
