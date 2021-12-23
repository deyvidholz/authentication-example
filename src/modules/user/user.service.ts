import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { CryptHelper } from '../../helpers/crypt.helper';
import { UserInvalidPassword } from './exceptions/user-invalid-password.exception';
import { UserNotFound } from './exceptions/user-not-found.exception';
import { UserValidationError } from './exceptions/user-validation.exception';
import { User } from './user.entity';
import { userRepository } from './user.repository';
import { IUser } from './user.typing';
import { userValidationSchema } from './validation-schemas/create-user.validation-schema';

export class UserService {
  async create(payload: IUser): Promise<CreateReturn> {
    const user = userRepository().create(payload);
    const validation = userValidationSchema().validate(payload);

    if (validation.error) {
      throw new UserValidationError();
    }

    await userRepository().save(user);
    return { user };
  }

  async auth(payload: AuthPayloadParam): Promise<AuthReturn> {
    const { password, username } = payload;

    let user = await userRepository().findOne({
      select: ['id', 'username', 'password'],
      where: { username },
    });

    if (!user) {
      throw new UserNotFound();
    }

    const isPasswordInvalid: boolean = !CryptHelper.isValidPassword(
      password,
      user.password
    );

    if (isPasswordInvalid) {
      throw new UserInvalidPassword();
    }

    const jwtPayload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: +process.env.JWT_EXPIRATION,
    });

    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    return { accessToken: token, expiration: decodedToken.exp };
  }
}

type CreateReturn = {
  user: User;
};

type AuthPayloadParam = {
  username: string;
  password: string;
};

type AuthReturn = {
  accessToken: string;
  expiration: number;
};
