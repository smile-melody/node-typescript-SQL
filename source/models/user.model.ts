import { ValidateController } from '../controllers/validate.controller';
import { EMessage } from '../services/message';
export class UserModel {
    id: number;
    name: string;
    username: string;
    password: string;
    phonenumber: string;
    remark: string;

    page: number;
    limit: number;

    public static validateAll(data: UserModel): string {

        if (Object.keys(data).length === 0) {
            return EMessage.objEmpty;
        }
        if (!data.name) {
            return "name" + EMessage.empty;
        }
        if (!data.username) {
            return "username" + EMessage.empty;
        }
        if (!data.password) {
            return "password" + EMessage.empty;
        }
        if (!data.phonenumber) {
            return "phonenumber" + EMessage.empty;
        }
        return "true";
    }
}
