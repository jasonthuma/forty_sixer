import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "resettokens" })
export class ResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  token: string;

  @Column({
    type: "datetime",
  })
  expiration: string;

  @Column({
    type: "datetime",
  })
  createdAt: string;
}
