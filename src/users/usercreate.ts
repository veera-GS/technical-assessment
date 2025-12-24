import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";

export const userCreate = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const db: Db | undefined = await getDb();

  const { userid, password, email, fullname,status = "user" } = res.locals.reqdata;
  const { email: createdBy, accountid } = res.locals.userdata;

  console.log("user create reqdata", res.locals.reqdata);

  if (!email || !password || !userid || !fullname) {
    res.json({ status: 400, message: "payload keys missing" });
  }
  const checkUser: any = await db
    ?.collection("loginUsers")
    .findOne({ email, userid, accountid });
  console.log("user create check user", checkUser);

  if (checkUser) {
    res.json({ status: 400, message: "user already signed up!!!" });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 8);
  console.log("hashPassword", hashPassword);

  const storeUser = await db
    ?.collection("loginUsers")
    .insertOne({
      email,
      password: hashPassword,
      fullname,
      userid,
      createdBy,
      accountid,
      status 
    });

  if (storeUser) {
    console.log(storeUser);
    res.json({
      status: 200,
      accountid,
      message: "user successfully signup!!!",
    });
    return;
  }
};
