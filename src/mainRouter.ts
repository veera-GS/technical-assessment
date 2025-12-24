import { accessToken } from "./auth/accessToken";
import { signin } from "./auth/signin";
import { signUp } from "./auth/signup";
import { gettoken } from "./core/gettoken";
import { reqdataValidation } from "./core/reqdataValidation";
import { userPermissions } from "./permissions/createPermission";
import { assignPermissions } from "./users/assignPermissions";
import { userCreate } from "./users/usercreate";

import { Router } from "express";
import { refresh } from "./auth/refresh";
import { userSignin } from "./auth/userauth/signin";
import { checkPermissions } from "./core/checkPermissions";
import { verifytoken } from "./core/verify-token";
import { createProject } from "./project/createProject";
import { projectList } from "./project/listProject";
import { createTask } from "./task/createtask";
import { assignTask } from "./task/taskAssign";
import { taskList } from "./task/tasklist";
import { userList } from "./users/userlist";

const router = Router()

router.post('/auth/signup',reqdataValidation,signUp)
router.post('/auth/signin',reqdataValidation,signin)

router.post('/auth/u/signin',reqdataValidation,userSignin)

router.post('/auth/accesstoken',reqdataValidation,accessToken)
router.post('/auth/refresh',gettoken,refresh)

router.post('/user/create',reqdataValidation,gettoken,verifytoken,checkPermissions("UserCrate"),userCreate)
router.get('/user/list',reqdataValidation,gettoken,verifytoken,checkPermissions("UserList"),userList)


router.post('/permission/create',reqdataValidation,gettoken,verifytoken,checkPermissions("PermissionCreate"),userPermissions)
router.post('/user/assignpermissions',reqdataValidation,gettoken,verifytoken,checkPermissions("AssignPermission"),assignPermissions)

router.post('/task/create',reqdataValidation,gettoken,verifytoken,checkPermissions("TaskCreate"),createTask)
router.post('/task/assign',reqdataValidation,gettoken,verifytoken,checkPermissions("TaskAssign"),assignTask)
router.get('/task/list',reqdataValidation,gettoken,verifytoken,checkPermissions("TaskList"),taskList)

router.post('/project/create',reqdataValidation,gettoken,verifytoken,checkPermissions("ProjectCreate"),createProject)
router.get('/project/list',reqdataValidation,gettoken,verifytoken,checkPermissions("ProjectList"),projectList)




export default router