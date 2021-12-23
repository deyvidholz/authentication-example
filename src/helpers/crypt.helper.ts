import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export class CryptHelper {
  static encryptPassword(password: string): string {
    return bcrypt.hashSync(password, salt);
  }

  static isValidPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
