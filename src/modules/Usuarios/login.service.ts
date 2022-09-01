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

    let usuarioparametro = await this.prisma.usuariosParametros.findFirst({
      where: { alias: "autvigenciasesion" },
      select: { usuario_parametro_id: true, valor_defecto: true }
    });

    let usuarioParametroValor = await this.prisma.usuariosParametrosValores.findMany({
      where: { usuario_parametro_id: usuarioparametro.usuario_parametro_id, usuario_id: token_decode['userId'] },
      include: { UsuariosParametros: true }
    });

    if (usuarioParametroValor !== null) {
      if (usuarioParametroValor[0].valor === null) {
        Object.assign(usuarioParametroValor[0], { valor: usuarioparametro.valor_defecto });
      }
    } else {
      Object.assign(usuarioParametroValor[0], { valor: usuarioparametro.valor_defecto });
    }

    let payload = await this.prisma.usuarios.findFirst({
      where: {
        usuario_id: token_decode['userId'],
      },
      include: { UsuariosSesionesSec: true }
    })

    Object.assign(payload, { UsuariosParametrosValores: usuarioParametroValor });

    Object.assign(payload, { context: ctx });

    return payload;
  }

}