import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "hikes" })
export class Hike {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  hikeDate: Date;

  @Column()
  hikers: string;

  @Column()
  weather: string;

  @Column()
  tripReport: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.hikes)
  @JoinColumn({ name: "userId" })
  user: User;
}
