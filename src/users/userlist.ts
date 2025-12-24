import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";

export const userList = async (req: Request, res: Response, _: NextFunction) => {
  const db: Db | undefined = await getDb();

  const {
    reqdata: { offset, pagesize },
    userdata: { accountid },
  } = res.locals;

  if(!offset ||!pagesize){
    res.json({status:400,message:"payload keys missing!!!"})
  }
  const users: any = await db
    ?.collection("loginUsers")
    .find({ accountid })
    .sort({ createdAt: -1 })
    .skip(Number(offset))
    .limit(Number(pagesize))
    .toArray();
  const count: any = await db
    ?.collection("loginUsers").countDocuments()
    res.json({status:200,users:users? users:[],offset,pagesize,documentCount:count})
    return
};
