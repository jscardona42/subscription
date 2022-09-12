import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlAuthGuard } from './modules/auth/guard/authguard.guard';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as fs from 'fs';
let https = require('https');
const express = require("express");

const options: NestApplicationOptions = {};
async function bootstrap() {

  const options: any = {};

  // validamos si los archivos existen
  if (fs.existsSync(process.env.CERTIFICATE_SSL) && fs.existsSync(process.env.KEY_SSL)) {
    options.httpsOptions = {
      cert: fs.readFileSync(process.env.CERTIFICATE_SSL),
      key: fs.readFileSync(process.env.KEY_SSL),
      requestCert: false,
      rejectUnauthorized: false,
    }
  }

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  app.useGlobalGuards(new GqlAuthGuard());
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  https.createServer(options.httpsOptions, server).listen(process.env.PORT || 3005);

}
bootstrap();
