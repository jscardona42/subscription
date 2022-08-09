import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from 'src/prisma/prisma.service';
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
    let token_decrypt = CryptoJS.AES.decrypt(token, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8)
    let token_decode = this.jwtService.decode(token_decrypt)


    let payload = await this.prisma.usuarios.findFirst({
      where: {
        usuario_id: token_decode['userId'],
        UsuariosParametrosValores: { some: { UsuariosParametros: { alias: "autvigenciasesion" } } }
      },
      include: { UsuariosSesionesSec: true, UsuariosParametrosValores: { include: { UsuariosParametros: true } } }
    })

    Object.assign(payload, { context: ctx });

    return payload;
  }

}