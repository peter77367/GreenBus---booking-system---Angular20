import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Station } from './Components/station/station';
import { Buses } from './Components/buses/buses';
import { About } from './Components/about/about';
import { LogIn } from './Components/log-in/log-in';
import { Register } from './Components/register/register';
import { Account } from './Components/account/account';
import { Searchresult } from './Components/searchresult/searchresult';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
           path: 'home',
           component: Home
    },
    {
        path: 'station',
        component: Station
    },
    {
        path: 'buses',
        component: Buses
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'login',
        component: LogIn
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'account' ,
        component: Account
    },
    {
        path: 'searchresult',
        component: Searchresult
    }
    



  
];
