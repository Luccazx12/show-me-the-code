import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('plans')
export class Plan {
  @PrimaryColumn()
  id: string;

  //unique
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  time_in_minutes: number;

  @Column()
  price: number;

  @Column()
  image_url: string;

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
