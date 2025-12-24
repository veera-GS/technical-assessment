import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";

export const createTask = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const {
    reqdata: { title, description, priority, status },
    userdata: { email, accountid },
  } = res.locals;

  const db: Db | undefined = await getDb();

  if (!title || !description || !priority || !status) {
    res.json({ status: 400, message: "payload keys missing" });
    return
  }
  const checkUser: any = await db?.collection("tasks").findOne({ title });

  if (checkUser) {
    res.json({ status: 400, message: "task already exist!!!" });
    return;
  }

  const storeTask = await db?.collection("tasks").insertOne({
    title,
    description,
    priority,
    status,
    createdBy: email,
    createAt: new Date(),
    accountid,
  });
  console.log(storeTask);

  if (storeTask) {
    res.json({
      status: 201,
      message: "Task Created successfully!!!",
    });
  }
};
