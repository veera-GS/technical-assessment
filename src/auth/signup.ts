import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";
export const signUp = async (req: Request, res: Response, _: NextFunction) => {
  const {
    reqdata: { email, password, fullname },
  } = res.locals;

  const db: Db | undefined = await getDb();
  if (!email || !password || !fullname) {
    res.json({ status: 400, message: "payload keys missing" });
  }

  const checkUser = await db?.collection("login").findOne({ email });
  console.log("checkUser", checkUser);

  if (checkUser) {
    res.json({ status: 400, message: "user already signed up!!!" });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 8);
  console.log("hashPassword", hashPassword);
const randomId = getRandomTenDigitNumber();
console.log(randomId); 

  const storeUser = await db
    ?.collection("login")
    .insertOne({
      accountid:randomId,
      email,
      password: hashPassword,
      fullname,
      createdAt: new Date(),
    });

  console.log("storeUser", storeUser);

  if (storeUser) {
    res.json({
      status: 200,
      message: "user successfully signup!!!",
    });
    return;
  }
  return;
};
function getRandomTenDigitNumber() {
  const min = 1000000000; // Smallest 10-digit number
  const max = 9999999999; // Largest 10-digit number
  // The formula for a random integer inclusive of both min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


