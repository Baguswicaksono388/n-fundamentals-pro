import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Connection } from '../common/constatnts/connection';

@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(`THIS IS THE CONNECTION: ${this.connection.CONNECTION_STRING}`);
  }

  @Post()
  create(@Body() createSongDTO: CreateSongDto) {
    this.songsService.craete(createSongDTO);
  }
  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
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
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `This action returns a #${id} song`;
  }

  @Put(':id')
  update(@Param('id') id: string): string {
    return `This action updates a #${id} song`;
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return `This action removes a #${id} song`;
  }
}
