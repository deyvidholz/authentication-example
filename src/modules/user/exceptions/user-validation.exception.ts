export class UserValidationError extends Error {
  constructor(msg: string = 'One or more fields are invalid') {
    super(msg);
    Object.setPrototypeOf(this, UserValidationError.prototype);
  }
}
