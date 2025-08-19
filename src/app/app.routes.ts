import { Routes } from '@angular/router';
import { List } from './list/list';
import { Add } from './add/add';
import { Update } from './update/update';
import { Register } from './register/register';
import { Login } from './login/login';

export const routes: Routes = [
    {
        path:'',
        component: List,
    },
    {
        path:'add',
        component: Add,
    },
    {
        path:'update/:id',
        component: Update,
    },
    {
        path:'register',
        component: Register,
    },
    {
        path:'login',
        component: Login,
    },
];
