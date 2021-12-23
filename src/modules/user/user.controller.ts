import { Request, Response } from 'express';
import { Controller } from '../../app/controller';
import { ResponseHttp } from '../../http/response.http';
import { ControllerHttpStatusCodes } from '../../typing/controller.typing';
import { UserService } from './user.service';
import { IUser } from './user.typing';

export class UserController extends Controller {
  private userService: UserService;

  static httpStatusCodes: ControllerHttpStatusCodes = {
    UserValidationError: 422,
    UserNotFound: 404,
    UserInvalidPassword: 401,
  };

  constructor() {
    super(UserController.httpStatusCodes);
    this.userService = new UserService();
  }

  create = (req: Request, res: Response) => {
    const payload: IUser = req.body;

    this.userService
      .create(payload)
      .then(({ user }) => {
        delete user.password;
        return ResponseHttp.success({
          res,
          status: 201,
          data: { user },
        });
      })
      .catch((error: Error) => {
        const httpStatusCode = this.getHttpStatus(error.constructor.name);

        return ResponseHttp.error({
          res,
          status: httpStatusCode,
          data: { message: error.message },
        });
      });
  };

  auth = (req: Request, res: Response) => {
    const payload: IUser = req.body;

    this.userService
      .auth(payload)
      .then((data) => {
        return ResponseHttp.success({
          res,
          status: 200,
          data,
        });
      })
      .catch((error: Error) => {
        const httpStatusCode = this.getHttpStatus(error.constructor.name);

        return ResponseHttp.error({
          res,
          status: httpStatusCode,
          data: { message: error.message },
        });
      });
  };
}
