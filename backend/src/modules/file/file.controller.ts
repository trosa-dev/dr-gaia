import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  getListOfFiles() {
    return this.fileService.getListOfFiles();
  }

  @Get(':filename/content')
  async getFileContentAsJson(
    @Param('filename') filename: string,
  ): Promise<any> {
    return await this.fileService.getFileContent(filename);
  }
}
