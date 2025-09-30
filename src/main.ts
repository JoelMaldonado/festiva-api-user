import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger('Festiva');

  const CERT_PATH = '/etc/letsencrypt/live/api.festiva.no/fullchain.pem';
  const KEY_PATH = '/etc/letsencrypt/live/api.festiva.no/privkey.pem';

  const httpsOptions = {
    key: fs.readFileSync(KEY_PATH),
    cert: fs.readFileSync(CERT_PATH),
  };

  const isProduction = process.env.PRODUCTION === 'true';

  const adapter = new FastifyAdapter({
    trustProxy: true,
    logger: false,
    https: isProduction ? httpsOptions : undefined,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors();
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  logger.log(`Listening on port ${port}`);
}
bootstrap();
