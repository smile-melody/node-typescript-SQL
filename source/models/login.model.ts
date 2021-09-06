import { EMessage } from '../services/message';
export class LoginModel {
    username: string;
    password: string;

    public static validateAll(data: LoginModel): string {

        if (Object.keys(data).length === 0) {
            return EMessage.objEmpty;
        }
        else if (!data.username) {
            return "username" + EMessage.empty;
        }
        else if (!data.password) {
            return "password" + EMessage.empty;
        } else {
            return "true";
        }
    }
}
