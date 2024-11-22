import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { UsuariosService } from '../usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly usuariosService: UsuariosService , private readonly jwtService: JwtService ,  private readonly prisma: PrismaService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.URL}/auth/facebook/callback`,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
      facebookId: profile.id,  
    };
  
    let userInDb = await this.usuariosService.findByEmail(user.email);

    if (!userInDb) {
      userInDb = await this.usuariosService.createF(user);
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

