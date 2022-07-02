import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@Entity('messages')
export class Message {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: 'user_sender' })
  @OneToOne(() => User) // specify inverse side as a second parameter
  userSender: User;

  @Column()
  user_receiver: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
