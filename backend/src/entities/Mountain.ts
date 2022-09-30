import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Hike } from "./Hike";

@Entity({ name: "mountains" })
export class Mountain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  elevation: number;

  @Column()
  difficulty: number;

  @Column()
  ascent: number;

  @Column()
  length: number;

  @Column()
  hikeTime: number;

  @Column()
  description: string;

  @OneToMany(() => Hike, (hike) => hike.mountain)
  hikes: Hike[];
}
