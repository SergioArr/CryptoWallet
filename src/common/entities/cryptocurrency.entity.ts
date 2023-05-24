import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cryptocurrency')
export class Cryptocurrency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  @CreateDateColumn()
  createdDate: Date;

  @Exclude()
  @UpdateDateColumn()  
  updatedDate: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedDate: Date;

}