import { Global, Module, ValidationPipe } from '@nestjs/common';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptions } from './graphql.options';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { join } from 'path';
import { UsuariosModule } from './modules/Usuarios/Usuarios.module';
import { GqlAuthGuard } from './modules/auth/guard/authguard.guard';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    // GraphQLFederationModule.forRoot({
    //   cors: {
    //     origin: '*',
    //     credentials: true,
    //   },
    //   context: ({ req, res }) => ({
    //     req: req,
    //     res: res
    //   }),
    //   autoSchemaFile: join(process.cwd(), "src/schema/schema.gql"),

    // }),
    PrismaModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: GqlAuthGuard,     
    // },
  ],
})
export class AppModule {}
