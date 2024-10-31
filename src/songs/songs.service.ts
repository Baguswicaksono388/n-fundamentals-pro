import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { Artist } from '../artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;

    const artists = await this.artistRepository.findByIds(songDto.artists);
    song.artists = artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releaseDate = songDto.releaseDate;

    return this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find({
      relations: ['artists'],
      select: {
        artists: {
          name: true,
        },
      },
    });
  }

  findOne(id: number): Promise<Song> {
    const song = this.songsRepository.findOne({
      where: { id },
      relations: ['artists'],
    });

    return song;
  }

  async remove(id: number): Promise<void> {
    await this.songsRepository.delete(id);
  }
}
