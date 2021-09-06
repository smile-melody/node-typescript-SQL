import mysql from 'mysql';
import { EDB } from '../config/config';
import { Service } from '../services/services';
import { EMessage } from '../services/message';

export class Databases {
    public static connection(): Promise<mysql.Connection> {
        return new Promise<mysql.Connection>(async (resolve, reject) => {
            try {
                const params = {
                    user: EDB.dbuser,
                    password: EDB.dbpass,
                    host: EDB.dbhost,
                    database: EDB.dbname
                };

                const connection = mysql.createConnection(params);

                connection.connect((error) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(connection);
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    public static query(connection: mysql.Connection, sql: string): Promise<Array<any>> {
        return new Promise<Array<any>>((resolve, reject) => {
            try {
                connection.query(sql, connection, (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error);
            }
        })
    }
    public static insert(sql: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                await Databases.connection().then(async (connection) => {
                    await Databases.query(connection, sql).then((result) => {
                        resolve(Service.respon(result, EMessage.addSuccess, 1));
                        connection.destroy();
                    })
                })
            } catch (error) {
                resolve(Service.respon([error], EMessage.addFail, 0));
            }
        })
    }
    public static update(sql: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                await Databases.connection().then(async (connection) => {
                    await Databases.query(connection, sql).then((result) => {
                        resolve(Service.respon(result, EMessage.updateSuccess, 1));
                        connection.destroy();
                    })
                })
            } catch (error) {
                resolve(Service.respon([error], EMessage.updateFail, 0));
            }
        })
    }
    public static delete(sql: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                await Databases.connection().then(async (connection) => {
                    await Databases.query(connection, sql).then((result) => {
                        resolve(Service.respon(result, EMessage.deleteSuccess, 1));
                        connection.destroy();
                    })
                })
            } catch (error) {
                resolve(Service.respon([error], EMessage.deleteFail, 0));
            }
        })
    }

    public static selectOne(sql: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                await Databases.connection().then(async (connection) => {
                    await Databases.query(connection, sql).then((result) => {
                        resolve(Service.respon(result, EMessage.listOne, 1));
                        connection.destroy();
                    })
                })
            } catch (error) {
                resolve(Service.respon([error], EMessage.listOne, 0));
            }
        })
    }
    public static selectPage(sqlCount: string, sqlPage: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                await Databases.connection().then(async (connection) => {
                    await Databases.query(connection, sqlCount).then(async (count) => {
                        const num = count[0].count
                        if (num > 0) {
                            await Databases.query(connection, sqlPage).then((row) => {
                                const data = {
                                    count: num,
                                    rows: row
                                }
                                resolve(Service.respon(data, EMessage.listPage, 1));
                                connection.destroy();
                            })
                        } else {
                            resolve(Service.respon([], EMessage.listPage, 0));
                        }
                    })
                })
            } catch (error) {
                resolve(Service.respon([error], EMessage.listPage, 0));
            }
        })
    }
    public static selectAll(sql: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                await Databases.connection().then(async (connection) => {
                    await Databases.query(connection, sql).then((result) => {
                        resolve(Service.respon(result, EMessage.listAll, 1));
                        connection.destroy();
                    })
                })
            } catch (error) {
                resolve(Service.respon([error], EMessage.listAll, 0));
            }
        })
    }
}