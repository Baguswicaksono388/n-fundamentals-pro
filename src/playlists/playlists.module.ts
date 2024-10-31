import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { UsersModule } from '../users/users.module';
import { SongsModule } from '../songs/songs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), UsersModule, SongsModule],
  providers: [PlaylistsService],
  controllers: [PlaylistsController],
})
export class PlaylistModule {}
