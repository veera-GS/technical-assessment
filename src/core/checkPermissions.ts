import { NextFunction, Request, Response } from "express";

export const checkPermissions = (originPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { userdata } = res.locals;

  console.log('localssssssssssss',res.locals);
  
    const { permissions =[], isadmin } = userdata;
console.log("userdata***********",userdata);

    if (!isadmin) {
      if (!permissions.includes(originPermission)) {
         res.status(403).json({
          message: "Permission Not Found!!!",
        });
        return
      }
    }

    next();
    return
  };
};
