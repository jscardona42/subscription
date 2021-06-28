import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      context: async ({ req, connection, res }) => connection ? ({ req: { headers: connection.context, res } }) : ({ req, res }),
      //context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: join(process.cwd(), "src/schema/schema.gql"),

      debug: true,
      introspection: true,
      playground: true,
      //tracing: true,
     // path: '/check',
      // cors: {
      //   origin: '*',
      //   credentials: true,
      // },
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 1000,
        path: '/subscriptions',
        onConnect: (connectionParams, webSocket, context) => {   

         

          if (connectionParams['Authorization'] != null && connectionParams['Authorization'] != '') {

            if (connectionParams['Authorization'].split(" ")[1]!= null && connectionParams['Authorization'].split(" ")[1]!= '' && connectionParams['Authorization'].split(" ")[1]!= 'null') { 
             return { authorization: connectionParams['Authorization'] };
            }
            
          } 
          
        },
        onDisconnect: (webSocket, context) => {
          //console.log('Disconnected!',webSocket)
        },
      },

    };
  }

  lowerCaseObjectKeys (value) {
    return Object.keys(value).reduce((c, k) => (c[k.toLowerCase()] = value[k], c), {});
    }
}