import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlAuthGuard } from './modules/auth/guard/authguard.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new GqlAuthGuard());  
  await app.listen(process.env.MS_PORT);
}
bootstrap();
