import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";

export const taskList = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const db: Db | undefined = await getDb();

  const {
    reqdata: { offset, pagesize },
    userdata: { email, accountid },
  } = res.locals;

  const tasks: any = await db
    ?.collection("tasks")
    .find({ createdBy: email, accountid })
    .sort({ createdAt: -1 })
    .skip(Number(offset))
    .limit(Number(pagesize))
    .toArray();
  const count: any = await db?.collection("tasks").countDocuments();
  res.json({
    status: 200,
    tasks: tasks ? tasks : [],
    offset,
    pagesize,
    documentCount: count,
  });
  return;
};
