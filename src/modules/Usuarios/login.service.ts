import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Login } from './models/login.entity';
import { Usuarios } from './models/usuarios.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import * as CryptoJS from 'crypto-js';  


@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  public async checktoken(ctx): Promise<any> {
    
    let authorization = ctx.req.headers.authorization;    

    let token = authorization.split(" ")[1]
    let token_decrypt= CryptoJS.AES.decrypt( token,process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8) 
    let token_decode= this.jwtService.decode(token_decrypt)


    return await this.prisma.usuarios.findFirst({
      where: { 
        usuario_id: token_decode['userId'],
      },
      
    })
  }
}