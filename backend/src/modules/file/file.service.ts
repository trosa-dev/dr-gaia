import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as csv from 'csv-parser';

@Injectable()
export class FileService {
  getListOfFiles() {
    const demoFilesPath = path.resolve('../mimic-demo-files/csv');
    return fs.readdir(demoFilesPath);
  }

  async getFileContent(filename) {
    try {
      // Cria uma promessa para ler o arquivo CSV
      const rows = [];

      // Resolva o caminho do arquivo
      const filePath = path.resolve('../mimic-demo-files/csv', filename);

      // Crie um stream para ler o arquivo CSV
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // Processa cada linha do arquivo CSV
          rows.push(row);
        })
        .on('end', () => {
          // Quando a leitura do arquivo é concluída
          console.log('CSV file successfully processed');
        });

      // Aguarde o término da leitura do arquivo e retorne os dados em uma promessa
      return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
            // Processa cada linha do arquivo CSV
            rows.push(row);
          })
          .on('end', () => {
            // Quando a leitura do arquivo é concluída, resolve a promessa com os dados
            resolve(rows);
          })
          .on('error', (error) => {
            // Em caso de erro, rejeita a promessa com o erro
            reject(error);
          });
      });
    } catch (error) {
      // Trata erros, como arquivo não encontrado, etc.
      console.error(`Erro ao ler o arquivo ${filename}:`, error);
      throw new Error(`Erro ao ler o arquivo ${filename}`);
    }
  }
}
