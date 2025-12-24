import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "./catchError";

export const gettoken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);

    // Usually in the format: "Bearer TOKEN"
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token', token);

    if (!token) {
        throw new Error('Token Not Found')
    }

    res.locals = { ...res.locals, token }
    next()
    return
})