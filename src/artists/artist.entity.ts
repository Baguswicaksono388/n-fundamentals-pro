import { Song } from 'src/songs/song.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  biography: string;

  //   Relations
  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
