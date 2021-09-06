import { NextFunction, Request, Response } from 'express';
import { Service } from '../services/services';
import { Databases } from './databases.controller';
import { LoginModel } from '../models/login.model';
import { EMessage } from '../services/message';
export class AuthorizeController {
    public static async logIn(req: Request, res: Response) {

        const data = req.body as LoginModel;
        const validate = LoginModel.validateAll(data);

        if (validate !== "true") {
            res.send(Service.respon([], validate, 0));
        } else {
            try {
                const sql = `select * from users where username='${data.username}' and password='${data.password}'`;
                await Databases.connection().then(async (connection) => {
                    await Databases.query(connection, sql).then((result) => {
                        if (result[0]) {
                            const users = Service.clone(result[0])
                            delete users.password;
                            const token = Service.createToken(users);
                            const data = {
                                user: users,
                                token: token
                            }
                            res.send(Service.respon(data, EMessage.loginSuccess, 1));
                            connection.destroy();
                        } else {
                            res.send(Service.respon([], EMessage.loginSuccess, 1));
                            connection.destroy();
                        }
                    })
                })
            } catch (error) {
                res.send(Service.respon([error], EMessage.loginFail, 0));
            }
        }
    }
    public static checkAuthorize(req: Request, res: Response, next: NextFunction) {
        const token: string = req.headers['token'] + '';
        if (token !== 'undefined' && token !== '') {
            const newToken = Service.validateToken(token);
            res.setHeader('token', newToken);
            if (newToken) {
                next();
            }
            else {
                res.status(402).send(Service.respon([], EMessage.noAuthorize, 0));
            }
        } else {
            res.status(404).send(Service.respon([], EMessage.noToken, 0));
        }
    }

}
