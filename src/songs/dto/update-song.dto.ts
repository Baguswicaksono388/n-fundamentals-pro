import {
  IsArray,
  IsDateString,
  IsInt,
  IsMilitaryTime,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDto {
  @IsOptional()
  @IsArray()
  readonly artists;

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly lyrics: string;

  @IsOptional()
  @IsDateString()
  readonly releaseDate: Date;

  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsOptional()
  @IsInt()
  readonly playlistId: number;
}
