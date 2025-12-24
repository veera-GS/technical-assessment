import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from './catchError';

export const reqdataValidation = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let data;
    console.log('111111');
    if (req.method === 'GET') {
      console.log('Reqest data get', req.query);
      data = req.query
    } else {
      console.log('Reqest data post', req.body);

      data = req.body.data;
    }
    if (!data) {
      throw new Error('request data notfound');
    }

    res.locals = { ...res.locals, reqdata: data };
    next();
    return;
  }
);