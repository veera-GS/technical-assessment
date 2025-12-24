import { Response } from 'express';
// import { Query } from 'express-serve-static-core';
import { Send } from 'express-serve-static-core';

interface Locals {
    token: string | undefined;
    email: string;
    password: string & number;
    userPassword: string;
    oldpassword: string;
    newpassword: string;
    emailId: string;
    projectname: string;
    login: { email: string; token: string; password: string };
    reqdata: any,
    userdata: any
}

export interface TypedResponse<ResBody> extends Response {
    json: Send<ResBody, this>;
    locals: Locals;
}
