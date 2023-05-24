import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Cryptocurrency } from './cryptocurrency.entity';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cryptocurrency_id: number;

  @Column({ length: 100 })
  sender: string;

  @Column({ length: 100 })
  receiver: string;

  @Column('numeric', { precision: 18, scale: 8 })
  amount: number;

  @CreateDateColumn()
  createdDate: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedDate: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Cryptocurrency)
  @JoinColumn({ name: 'cryptocurrency_id', referencedColumnName: 'id' })
  cryptocurrency: Cryptocurrency;
}
