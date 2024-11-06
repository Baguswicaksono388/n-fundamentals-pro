import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { Artist } from '../artists/artist.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
  ) {}

  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;

    const artists = await this.artistRepository.findByIds(songDto.artists);
    song.artists = artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releaseDate = songDto.releaseDate;

    const playlist = await this.playlistRepository.findOne({
      where: { id: songDto.playlistId },
    });
    song.playlist = playlist;

    return this.songsRepository.save(song);
  }

  async findOne(id: number): Promise<Song> {
    const song = this.songsRepository.findOne({
      where: { id },
      relations: ['artists'],
    });

    return song;
  }

  async remove(id: number): Promise<void> {
    await this.songsRepository.delete(id);
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    const song = await this.songsRepository.findOne({
      where: { id },
      relations: ['artists'],
    });

    if (!song) {
      throw new Error('Song not found');
    }

    if (updateSongDto.title) song.title = updateSongDto.title;
    if (updateSongDto.duration) song.duration = updateSongDto.duration;
    if (updateSongDto.lyrics) song.lyrics = updateSongDto.lyrics;
    if (updateSongDto.releaseDate) song.releaseDate = updateSongDto.releaseDate;

    if (updateSongDto.artists) {
      const artists = await this.artistRepository.findByIds(
        updateSongDto.artists,
      );
      song.artists = artists;
    }

    if (updateSongDto.playlistId) {
      const playlist = await this.playlistRepository.findOne({
        where: { id: updateSongDto.playlistId },
      });
      song.playlist = playlist;
    }

    return this.songsRepository.save(song);
  }

  async paginate({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<Pagination<Song>> {
    const [results, total] = await this.songsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['artists', 'playlist'],
    });

    return {
      items: results,
      meta: {
        totalItems: total,
        itemCount: results.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}
