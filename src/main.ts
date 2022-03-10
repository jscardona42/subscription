import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlAuthGuard } from './modules/auth/guard/authguard.guard';
import { NestApplicationOptions, Logger } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';

const options: NestApplicationOptions = {};
async function bootstrap() {
  const logger = new Logger('MAIAPUBSUB');

  logger.log('USE_SSL:' + process.env.USE_SSL);
  const isProduction: boolean = process.env.USE_SSL === 'true';

  const port = process.env.MS_PORT || 3005;
  let http = 'HTTP';

  if (isProduction) {
    const secretsDir = join(__dirname, '..', 'secrets');
    logger.log('SSL certificate dir:' + secretsDir);
    try {
      const httpsOptions = {
        key: readFileSync(`${secretsDir}/key.pem`),
        cert: readFileSync(`${secretsDir}/cert.pem`),
      };
      options.httpsOptions = httpsOptions;
      http = 'HTTPS';
    } catch (error) {
      logger.log(
        'No SSL cert found, starting server without SSL. Error:' + error,
      );
    }
  }
  const app = await NestFactory.create(AppModule, options);
  app.useGlobalGuards(new GqlAuthGuard());
  await app
    .listen(port)
    .then(() => logger.log(`${http} Server running on port ${port}`));
}
bootstrap();
