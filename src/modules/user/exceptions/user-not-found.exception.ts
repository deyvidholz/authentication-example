export class UserNotFound extends Error {
  constructor(msg: string = 'User not found') {
    super(msg);
    Object.setPrototypeOf(this, UserNotFound.prototype);
  }
}
