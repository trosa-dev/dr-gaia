import { Module } from '@nestjs/common';
import { FilesModule } from './modules/file/file.module';

@Module({
  imports: [FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
