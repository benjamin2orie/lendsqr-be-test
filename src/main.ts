import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FauxAuthGuard } from './common/guards/faux.auth.guard';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const documentBuilder = new DocumentBuilder()
    .setTitle('Lendsqr API')
    .setDescription('API documentation for Lendsqr')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter your faux token (format: Bearer token-xxxxx)',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);
  app.useGlobalGuards(app.get(FauxAuthGuard));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
