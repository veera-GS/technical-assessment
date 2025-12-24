import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";
export const accessToken = async (req: Request, res: Response, _: NextFunction) => {
  const { securitycode } = res.locals.reqdata;
  const db: Db | undefined = await getDb();

  if (!securitycode) {
    res.json({ status: 400, message: "payload keys missing" });
  }

  const checkToken = await db
    ?.collection("accessToken")
    .findOne({ securitycode });

console.log('toekn******',checkToken);

  if (!checkToken) {
    res.json({ status: 400, message: "SecurityCode Not Found!!!" });
  }

  if (checkToken) {
    res.json({
      status: 200,
      token: checkToken.token,
    });
    return
  }
  return;
};
