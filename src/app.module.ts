import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptions } from './graphql.options';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './modules/Usuarios/Usuarios.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlOptions,
    }),
    PrismaModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
