
import { Injectable, ExecutionContext, UnauthorizedException, Inject } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import * as jwt from 'jsonwebtoken'
import { PrismaService } from "src/prisma/prisma.service";
import * as CryptoJS from 'crypto-js';

const prisma = new PrismaService();

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<any> {
        let authorization;
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        let query = context.getHandler().name;

        if (req === undefined) {
            authorization = ctx['args'][2]['authorization'];
        } else {
            let header_name;
            for (let key in req.headers) {
                if (key.startsWith("authorization")) {
                    header_name = key;
                }
            }
            authorization = req.headers[header_name];
        }

        try {
            if (authorization && authorization !== "" && Object.keys(authorization).length > 0) {

                let token = authorization.split(" ")[1];

                let token_decrypt = CryptoJS.AES.decrypt(token, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8)
                let token_decode = jwt.decode(token_decrypt)

                if (jwt.verify(token_decrypt, process.env.JWT_SECRET)) {

                    if (query == 'checkTokenHandler') {
                        return true;
                    }

                    let login_user = await prisma.usuarios.findFirst({
                        where: {
                            usuario_id: token_decode['userId'],
                            UsuariosSesionesSec: { token: token_decrypt }
                        },
                    })

                    if (login_user) {
                        return true;
                    } else {
                        throw new UnauthorizedException("Unauthorized");
                    }
                } else {
                    throw new UnauthorizedException("Unauthorized");
                }
            } else {
                if (query == 'checkTokenHandler') {
                    return true;
                }
                throw new UnauthorizedException("Unauthorized");
            }
        } catch (error) {
            if (query == 'checkTokenHandler') {
                return true;
            }
            throw new UnauthorizedException("Unauthorized");
        }
    }
}

