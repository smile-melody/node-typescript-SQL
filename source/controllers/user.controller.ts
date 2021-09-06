import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { EMessage } from '../services/message';
import { Service } from '../services/services';
import { Databases } from './databases.controller';
import { ValidateController } from './validate.controller';
export class UserConroller {

    public static add(req: Request, res: Response) {

        const data = req.body as UserModel;
        const validate = UserModel.validateAll(data);

        if (validate !== "true") {
            res.send(Service.respon([], validate, 0));
        } else {

            const sqlUsername = `select * from users where username='${data.username}'`;
            ValidateController.alreadyExist(sqlUsername).then((result) => {

                if (result) {

                    const msg = "username: " + data.username + EMessage.alreadyExist;
                    res.send(Service.respon([], msg, 0));

                } else {

                    const sql = `insert into users (name,username,password,phonenumber,remark)
                         values ('${data.name}','${data.username}','${data.password}','${data.phonenumber}','${data.remark}')`;
                    Databases.insert(sql).then(result => {
                        res.send(result)
                    });
                }
            })
        }
    }

    public static update(req: Request, res: Response) {

        const data = req.body as UserModel;
        const validate = UserModel.validateAll(data);

        if (!data.id) {
            res.send(Service.respon([], "id" + EMessage.empty, 0));
        } else if (validate !== "true") {
            res.send(Service.respon([], validate, 0));
        } else {
            const sqlUsername = `select * from users where username='${data.username}' and id!='${data.id}'`;
            ValidateController.alreadyExist(sqlUsername).then((result) => {

                if (result) {

                    const msg = "username: " + data.username + EMessage.alreadyExist;
                    res.send(Service.respon([], msg, 0));

                } else {
                    const sql = `update users set name='${data.name}', username='${data.username}', password='${data.password}',
                        phonenumber='${data.phonenumber}',remark='${data.remark}' where id='${data.id}'`;
                    Databases.update(sql).then(result => {
                        res.send(result)
                    });
                }
            });
        }
    }

    public static delete(req: Request, res: Response) {

        const data = req.body as UserModel;

        if (!data.id) {
            res.send(Service.respon([], "id" + EMessage.empty, 0));
        } else {

            const sql = `delete from users where id='${data.id}'`;
            Databases.delete(sql).then(result => {
                res.send(result)
            });
        }
    }
    public static listOne(req: Request, res: Response) {

        const data = req.body as UserModel;

        if (!data.id) {
            res.send(Service.respon([], "id" + EMessage.empty, 0));
        } else {

            const sql = `select * from users where id = ${data.id}`;
            Databases.selectOne(sql).then(result => {
                res.send(result)
            });
        }
    }
    public static listPage(req: Request, res: Response) {

        const data = req.body as UserModel;
        const page = data.page ? data.page : 1;
        const limit = data.limit ? data.limit : 10;
        const offset = (page - 1) * limit;

        const sqlCount = "select count(*) as count from users";
        const sqlPage = `select * from users order by id desc limit ${limit} offset ${offset} `;

        Databases.selectPage(sqlCount, sqlPage).then(result => {
            res.send(result)
        });
    }
    public static listAll(req: Request, res: Response) {

        const sql = `select * from users order by id desc`;

        Databases.selectAll(sql).then(result => {
            res.send(result)
        });
    }
}
