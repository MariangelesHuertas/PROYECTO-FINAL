import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsuariosService } from '../usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usuariosService: UsuariosService, private readonly jwtService: JwtService, private readonly prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.URL}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const {id ,  name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      googleId: id,
    };
    let userInDb = await this.usuariosService.findByEmail(user.email);

    if (!userInDb) {
      userInDb = await this.usuariosService.createG(user , "Candidato");
    }

    const token = this.jwtService.sign({ id: userInDb.id });

    const updateToken = await this.prisma.usuarios.update({
      where:{id:userInDb.id},
      data:{
        token
      }
    })
    done(null, {user:updateToken , token});
  }
}