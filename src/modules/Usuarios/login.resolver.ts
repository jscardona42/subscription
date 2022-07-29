import { Usuarios } from './models/usuarios.entity';
import { Context, Query, Resolver, Subscription } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { PubSub } from 'graphql-subscriptions';
import * as jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';

const pubSub = new PubSub();

@Resolver(() => Usuarios)
export class LoginResolver {

  constructor(
    private readonly service: LoginService
  ) { }

  @Query(() => Usuarios, { nullable: true })
  async checkToken(@Context() ctx): Promise<any> {
    let _check = await this.service.checktoken(ctx)
    pubSub.publish('checkTokenHandler', { checkTokenHandler: _check });
    return _check
  }


  @Subscription(() => Usuarios, {
    nullable: true, filter: (payload, variables, ctx) => {
      return validateUniqueSession(payload, ctx);
    },
  })

  async checkTokenHandler() {
    return pubSub.asyncIterator('checkTokenHandler');
  }

}

export function validateUniqueSession(payload, ctx) {
  let authorization;
  let context = payload.checkTokenHandler.context;

  if (Object.keys(ctx).length > 0) {
    authorization = ctx.authorization
  } else {
    authorization = context.req.headers.authorization;
  }

  if (authorization == null) {
    return false
  }

  let token = authorization.split(" ")[1];
  let token_decrypt = CryptoJS.AES.decrypt(token, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8)
  let token_decode = jwt.decode(token_decrypt);

  if (payload.checkTokenHandler.usuario_id === token_decode['userId'] && token_decrypt != payload.checkTokenHandler.UsuariosSesionesSec.token) {
    return true
  } else {
    return false
  }
}
