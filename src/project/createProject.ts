import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";

export const createProject = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const {
    reqdata: {
      organization,
      projectname,
      signInSuccessUrl,
      signUpSuccessUrl,
      signInErrorUrl,
      signUpErrorUrl,
    },
    userdata: { email, accountid },
  } = res.locals;

  const db: Db | undefined = await getDb();

  if (
    !organization ||
    !projectname ||
    !signInSuccessUrl ||
    !signUpSuccessUrl ||
    !signInErrorUrl ||
    !signUpErrorUrl
  ) {
    res.json({ status: 400, message: "payload keys missing" });
  }
  const checkUser: any = await db
    ?.collection("project")
    .findOne({ organization, email });

  if (checkUser) {
    res.json({ status: 400, message: "user already signed up!!!" });
    return;
  }

  const storeTask = await db?.collection("projects").insertOne({
    organization,
    projectname,
    signInSuccessUrl,
    signUpSuccessUrl,
    signInErrorUrl,
    signUpErrorUrl,
    createdBy: email,
    createAt: new Date(),
    accountid,
  });
  console.log(storeTask);

  if (storeTask) {
    res.json({
      status: 201,
      message: "Project Created successfully!!!",
    });
    return;
  }
  return;
};
