import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';



@Module({
  providers: [LoginResolver, LoginService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN
      }
    }),
  ]
})
export class UsuariosModule {}
