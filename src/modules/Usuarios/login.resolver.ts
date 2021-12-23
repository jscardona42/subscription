import { Usuarios } from './models/usuarios.entity';
import { Args, Context, Query, Resolver, Subscription } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { Login} from './models/login.entity';
import { PubSub } from 'graphql-subscriptions';
import * as jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';  

const pubSub = new PubSub();

@Resolver(() => Usuarios)
export class LoginResolver {
  

  constructor(
    private readonly service: LoginService
  ) { }

  //@UseGuards(GqlAuthGuard)
  @Query(returns => Usuarios, { nullable: true })
  async checkToken(@Context() ctx): Promise<any> {  
    let _check = await this.service.checktoken(ctx)
    pubSub.publish('checkTokenHandler', { checkTokenHandler: _check }); 
    return _check
  }


  @Subscription(returns => Usuarios, { nullable: true, filter: (payload, variables, context) => {

      if (context.req.headers.authorization==null) {
          return false 
      }

      let token = context.req.headers.authorization.split(" ")[1]
      let token_decrypt= CryptoJS.AES.decrypt( token,process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8) 
      let token_decode= jwt.decode(token_decrypt)     
          

      if (payload.checkTokenHandler.usuario_id === token_decode['userId'] && context.req.headers.authorization.split(" ")[1] != payload.checkTokenHandler.token) {
        return true
      }else{
        return false
      }  
      
    },
    // resolve: (payload, args, context, info) => {
    //   console.log(payload);
      
    // },
  })
  async checkTokenHandler(@Context() ctx) {
    
    return pubSub.asyncIterator('checkTokenHandler');
  }
}
