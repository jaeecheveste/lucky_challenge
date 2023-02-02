import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ORMExceptionFilter } from './common/filters/orm.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Document API
  const options = new DocumentBuilder()
    .addBearerAuth()
    .addTag('Authentication')
    .setTitle('Lucky Challenge')
    .setDescription('This is an API for Lucky Challenge')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new ORMExceptionFilter());
  await app.listen(3000);
}
bootstrap();
