import * as jwt from 'jsonwebtoken';
import date from 'date-and-time';
import * as uuid from 'uuid';
import { UserModel } from '../models/user.model';

export class Service {

    public static respon(data: any, message: string, status: number) {
        return { status, message, data };
    }

    public static clone(data: any) {
        return JSON.parse(JSON.stringify(data))
    }
    public static copyObject(a: any, b: any) {
        for (const key in a) {
            if (Object.prototype.hasOwnProperty.call(a, key)) {
                b[key] = a[key];
            }
        }
    }
    static createToken(data: UserModel) {
        try {
            return jwt.sign({
                data,
            }, Keys.jwtKey, { expiresIn: '10000000000H' });
        } catch (error) {
            console.log(error);
            return '';
        }
    }
    static validateToken(k: string) {
        try {
            const data = jwt.verify(k, Keys.jwtKey) as UserModel;
            console.log(data);
            const token = Service.createToken(data);
            if (token) return token;
            else return '';
        } catch (error) {
            console.log(error);
            return '';
        }
    }
    public static genUUID(): string {
        return uuid.v1();
    }
    public static nDate(): string {
        const dd = new Date();
        return date.format(dd, 'YYYY-MM-DD HH:mm:ss');
    }
}
export const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Vientiane'
});

enum Keys {
    jwtKey = 'Dx4YsbptOGuHmL94qdC2YAPqsUFpzJkc',
    superadminkey = '9F58A83B7628211D6E739976A3E3A'
}