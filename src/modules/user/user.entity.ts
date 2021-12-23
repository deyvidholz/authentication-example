import 'dotenv/config';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CryptHelper } from '../../helpers/crypt.helper';
import { IUser } from './user.typing';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  private beforeInsert() {
    this.password = CryptHelper.encryptPassword(this.password);
  }
}
