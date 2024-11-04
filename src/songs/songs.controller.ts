import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './song.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song>> {
    try {
      limit = limit > 100 ? 100 : limit;
      return this.songsService.paginate({
        page,
        limit,
      });
    } catch (error) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    const song = await this.songsService.findOne(id);

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    return song;
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<void> {
    throw new HttpException('Success Delete Song', HttpStatus.OK);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDTO);
  }
}
