import { getConnection, Repository } from 'typeorm';
import { User } from './user.entity';

export function userRepository(): Repository<User> {
  return getConnection().getRepository(User);
}
