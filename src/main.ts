import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

export const PROJECT_NAME = 'Skeleton';
export const PROJECT_VERSION = '0.1.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(PROJECT_NAME);

  const options = new DocumentBuilder()
    .setTitle(PROJECT_NAME)
    .setDescription('NestJS+DDD+CQRS+ES boilerplate')
    .setVersion(PROJECT_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0', () => {
    logger.log('Started at http://localhost:3000/api');
  });
}
bootstrap();
