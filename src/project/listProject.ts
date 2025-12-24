import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";

export const projectList = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const db: Db | undefined = await getDb();

  const {
    reqdata: { offset, pagesize },
    userdata: { email,accountid },
  } = res.locals;

  const projects: any = await db
    ?.collection("project")
    .find({ createdBy: email,accountid })
    .sort({ createdAt: -1 })
    .skip(Number(offset))
    .limit(Number(pagesize))
    .toArray();

  const count: any = await db?.collection("project").countDocuments();

  res.json({
    status: 200,
    projects: projects ? projects : [],
    offset,
    pagesize,
    documentCount: count,
  });
  return;
};
