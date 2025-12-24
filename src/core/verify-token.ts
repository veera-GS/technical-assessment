import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";

export const verifytoken = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const token = res.locals.token;

  const verifytoken: any = jwt.verify(token, "JWT_SECRET");
  console.log("verifytoken", verifytoken);

  res.locals = { ...res.locals, userdata: verifytoken };
  const db: Db | undefined = await getDb();

  if (!verifytoken.isadmin) {
    const checkPermissions = await db
      .collection("UserPermissions")
      .findOne({ userid: verifytoken.userid });
    console.log("permissions", checkPermissions);

    res.locals = {
      ...res.locals,
      userdata: { ...verifytoken, permissions:checkPermissions?checkPermissions.permissions :[] },
    };
  }
  next();
  return;
};
