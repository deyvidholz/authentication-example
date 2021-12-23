export class UserInvalidPassword extends Error {
  constructor(msg: string = 'Username or password is invalid') {
    super(msg);
    Object.setPrototypeOf(this, UserInvalidPassword.prototype);
  }
}
