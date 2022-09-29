import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Hike } from "./Hike";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Hike, (hike) => hike.user)
  hikes: Hike[];
}
