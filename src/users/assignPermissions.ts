import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";

export const assignPermissions = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const db: Db | undefined = await getDb();

  const { permission, userid } = req.body.data;
  const {
    userdata: { email, accountid },
  } = res.locals;
  if (!permission || !userid) {
    res.json({ status: 400, message: "payload keys missing" });
  }

  const checkUser: any = await db?.collection("loginUsers").findOne({ userid });
  if (!checkUser) {
    res.json({ status: 400, message: "user not found!!!" });
    return;
  }

  const checkPermissions: any = await db
    ?.collection("Permissions")
    .findOne({ permissionname: permission, createdBy: email, accountid });

  if (!checkPermissions) {
    res.json({ status: 400, message: "Permissions not found!!!" });
    return;
  }

  const assignPermissions = await db
    ?.collection("UserPermissions")
    .updateOne(
      { createdBy: email, userid },
      { $addToSet: { permissions: { $each: checkPermissions.permissions } } },{upsert:true}
    );
  console.log("assignPermissions", assignPermissions);

  if (assignPermissions) {
    res.json({
      status: 200,
      message: "Permissions Assigned successfully!!!",
    });
    return;
  }
};
