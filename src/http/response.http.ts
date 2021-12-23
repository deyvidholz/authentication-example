import { Response } from 'express';

export class ResponseHttp {
  static success(data: SuccessParam) {
    const { res, status } = data;
    const payload = data.data;
    return res.status(status || 200).json(payload);
  }

  static error(data: ErrorParam) {
    const { res, status } = data;
    const payload = data.data;
    return res.status(status || 422).json(payload);
  }
}

type SuccessParam = {
  res: Response;
  status: number;
  data?: any;
};

type ErrorParam = {
  res: Response;
  status: number;
  data?: any;
};
