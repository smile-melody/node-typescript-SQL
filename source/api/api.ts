import { Application } from 'express';
import express from 'express';
import { UserConroller } from '../controllers/user.controller';
import { AuthorizeController } from '../controllers/authorize.controller';

const app: Application = express();

//<=== Login ===>
app.post('/login', AuthorizeController.logIn);

//<=== User ===>
app.post('/addUser', AuthorizeController.checkAuthorize, UserConroller.add);
app.post('/updateUser', AuthorizeController.checkAuthorize, UserConroller.update);
app.post('/deleteUser', AuthorizeController.checkAuthorize, UserConroller.delete);
app.post('/listOneUser', AuthorizeController.checkAuthorize, UserConroller.listOne);
app.post('/listPageUser', AuthorizeController.checkAuthorize, UserConroller.listPage);
app.post('/listAllUser', AuthorizeController.checkAuthorize, UserConroller.listAll);

export = app;

