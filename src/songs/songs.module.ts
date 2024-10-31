import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from '../artists/artist.entity';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  providers: [SongsService],
  controllers: [SongsController],
  exports: [TypeOrmModule],
})
export class SongsModule {}
