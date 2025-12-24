import { NextFunction, Request, Response } from "express";
import { Db, ObjectId } from "mongodb";
import { getDb } from "../../mongodb";

export const assignTask = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const {
    reqdata: { id, userid },
    userdata: { email,accountid },
  } = res.locals;

  const db: Db | undefined = await getDb();

  if (!id || !userid) {
    res.json({ status: 400, message: "payload keys missing" });
  }
  const checkUser: any = await db?.collection("loginUsers").findOne({ userid });
  const task: any = await db?.collection("tasks").findOne({ _id:new ObjectId(id) });


   if (!task) {
    res.json({ status: 400, message: "Task Not Found!!!" });
    return;
  }

  if (!checkUser) {
    res.json({ status: 400, message: "user Not Found!!!" });
    return;
  }

  const storeTask = await db
    ?.collection("assignTask")
    .insertOne({
      id,
      userid,
      createdBy: email,
      createAt: new Date(),accountid
    });
    console.log(storeTask);

  if (storeTask) {
    res.json({
      status: 201,
      message: "Task Created successfully!!!",
    });
  }
};
