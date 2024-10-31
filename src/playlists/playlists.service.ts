import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreatePlayListDTO } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,

    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(playlistDTO: CreatePlayListDTO): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDTO.name;

    // song will be the array of ids that we are getting from the DTO object
    const songs = await this.songRepository.findByIds(playlistDTO.songs);
    playlist.songs = songs;
    // user akan menjadi id yang kita dapatkan dari objek DTO
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'firstName', 'lastName'],
      where: { id: playlistDTO.user },
    });
    playlist.user = user;

    return this.playlistRepository.save(playlist);
  }
}
