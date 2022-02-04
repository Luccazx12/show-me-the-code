import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('tariffs')
export class Tariff {
  @PrimaryColumn()
  id: string;

  //unique
  @Column()
  origin: number;

  @Column()
  destiny: number;

  @Column()
  coast_per_minute: number;

  @Column({ default: true })
  activated: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
