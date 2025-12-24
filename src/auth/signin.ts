import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Db } from "mongodb";
import { v4 as uuid } from "uuid";
import { getDb } from "../../mongodb";

export const signin = async (req: Request, res: Response, _: NextFunction) => {
  const { email, password } = res.locals.reqdata;

  const db: Db | undefined = await getDb();

  if (!email || !password) {
    res.json({ status: 400, message: "payload keys missing" });
  }
  const checkUser: any = await db?.collection("login").findOne({ email });


  if (!checkUser) {
    res.json({ status: 400, message: "user not exist!!!" });
    return
  }

  const comparePassword = bcrypt.compare(password,checkUser.password)
  console.log('comparePassword,comparePassword');
  
  if(!comparePassword){
    res.json({status:400,message:"password incorrect!!!"})
    return
  }
  const payload = {
    email,
    isadmin: true,
    fullname: checkUser.fullname,
    accountid:checkUser.accountid,
  };
  const token = jwt.sign(payload, "JWT_SECRET", { expiresIn: "7d" });

  const securitycode = uuid();

  console.log("securitycode", securitycode);

  const storetoken: any = await db
    ?.collection("accessToken")
    .insertOne({ token, securitycode, ...payload, createdAt: new Date() });

  console.log("storetoken", storetoken);

  res.json({
    status: 201,
    message: "signin Success get AccessToken",
    securitycode,
  });
  return;
};
