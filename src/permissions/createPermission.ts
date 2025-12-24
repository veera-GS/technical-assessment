import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";
import { getDb } from "../../mongodb";


export const userPermissions =async(req:Request,res:Response,_:NextFunction)=>{
  const db: Db | undefined = await getDb();

const {permissions,permissionname} = res.locals.reqdata
const {userdata:{email,accountid}} = res.locals
 if (!permissions) {
    res.json({ status: 400, message: "payload keys missing" });
  }

   const checkPermissions = await db
      ?.collection("Permissions")
      .findOne({ permissionname,createdBy:email,accountid });
      console.log("checkPermissions",checkPermissions);

      if(checkPermissions) {
        res.json({status:400,message:"Permission alredy exist!!!"})
        return
      }
    const createPermissions = await db
      ?.collection("Permissions")
      .insertOne({ permissionname,permissions,createdBy:email,accountid,createdAt:new Date() });
      console.log("createPermissions",createPermissions);

    if (createPermissions) {
    res.json({
      status: 200,
      message: "Permissions created successfully!!!",
    });
    return
  }
      
}