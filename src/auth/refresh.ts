import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const refresh = (_: Request, res: Response, next: NextFunction) => {
  const token = res.locals.token;

  const verifytoken = jwt.verify(token, "JWT_SECRET");
  console.log("verifytoken", verifytoken);

  res.locals.userdata = { ...res.locals, userdata: verifytoken };

  if (verifytoken) {
    res.json({
      userdata: verifytoken,
      token,
    });
    return;
  }
  return;
};
