import { NextFunction, Request, Response } from 'express';

export const catchAsyncError =
    (fn: (req: Request, res: Response, next: NextFunction) => void) =>
        (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch((err) => {
                console.log('******_Error', err);
                res
                    .status(400)
                    .json({ status: 400, data: err.message || 'Error Occured' });
            });

            // try {
            //     fn(req, res, next)
            // } catch (error: any) {
            //     res
            //         .status(400)
            //         .json({ status: 400, data: error.message || 'Error Occured' });
            // }
        };