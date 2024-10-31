import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsMilitaryTime,
  IsDateString,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  artists: number[]; // Array of artist IDs

  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsNotEmpty()
  @IsString()
  lyrics: string;
}