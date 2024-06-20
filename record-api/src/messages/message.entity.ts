import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  userIdSend: number;

  @Column()
  userIdReceive: number;
}
