import { GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { ApolloDriverConfig } from '@nestjs/apollo';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      context: async ({ req, connection, res }) => connection ? ({ req: connection.context, res }) : ({ req, res }),
      debug: true,
      introspection: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema/schema.gql"),
      cors: {
        origin: '*',
        credentials: true,
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        "subscriptions-transport-ws": {
          path: '/subscriptions',
          keepAlive: 1000,
          onConnect: (connectionParams) => {
            if (connectionParams['Authorization'] != null && connectionParams['Authorization'] != '') {
              if (connectionParams['Authorization'].split(" ")[1] != null && connectionParams['Authorization'].split(" ")[1] != '' && connectionParams['Authorization'].split(" ")[1] != 'null') {
                return { authorization: connectionParams['Authorization'] };
              }
            }
          },
          onDisconnect: (webSocket, context) => {
          },
        }
      },

    };
  }

  lowerCaseObjectKeys(value) {
    return Object.keys(value).reduce((c, k) => (c[k.toLowerCase()] = value[k], c), {});
  }
}