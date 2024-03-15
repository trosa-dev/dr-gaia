import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Client } from 'pg';
import { dbConfig } from './config/db';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const client = new Client(dbConfig);
  await client.connect(); // Conectar ao banco de dados

  try {
    // Consulta de teste
    const query = 'SELECT * FROM sua_tabela LIMIT 1'; // Substitua 'sua_tabela' pelo nome da sua tabela
    const result = await client.query(query);
    console.log('Resultado da consulta de teste:', result.rows);
  } catch (error) {
    console.error('Erro ao executar consulta de teste:', error);
  } finally {
    await client.end(); // Fechar conexão após a consulta
  }

  const config = new DocumentBuilder()
    .setTitle('Dr Gaia')
    .setVersion('1.0')
    //.setDescription('The cats API description')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
