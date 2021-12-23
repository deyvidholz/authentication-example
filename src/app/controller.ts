import { ControllerHttpStatusCodes } from '../typing/controller.typing';

export class Controller {
  constructor(protected httpStatusCodes: ControllerHttpStatusCodes) {}

  protected getHttpStatus(className: string) {
    return this.httpStatusCodes[className] || 500;
  }
}
