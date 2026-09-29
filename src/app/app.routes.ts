import { Routes } from '@angular/router';
import path from 'path';
import { ProductDetails } from './products/product-details/product-details';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login2",
        pathMatch: "full"
    },
    {
        path: "products",
        loadComponent: () => import("./products/products").then(p => p.Products),
        // children: [
        //     {
        //         path: ":id",
        //         // component: ProductDetails
        //         loadComponent: () => import("./products/product-details/product-details").then(pd => pd.ProductDetails)
        //     }
        // ]
        canActivate: [authGuard]
    }, {

        path: "products/:id",
        loadComponent: () => import("./products/product-details/product-details").then(pd => pd.ProductDetails)
    },

    {
        path: "counter",
        loadComponent: () => import("./counter/counter").then(c => c.Counter),
        canActivate: [authGuard]

    },
    {
        path: "login",
        loadComponent: () => import("./login/login").then(l => l.Login),
        // canActivate: [authGuard]
    },
    {
        path: "signup",
        loadComponent: () => import("./signup/signup").then(s => s.Signup),
        // canActivate: [authGuard]
    },
    {
        path: "cart",
        loadComponent: () => import("./cart/cart").then(c => c.Cart),
        canActivate: [authGuard]
    },
    {
        path: "parent",
        loadComponent: () => import("./parent/parent").then(p => p.Parent)
    },
    {
        path: "child",
        loadComponent: () => import("./child/child").then(c => c.Child)
    },
    {
        path: "parent2",
        loadComponent: () => import("./parent2/parent2").then(p => p.Parent2)
    },
    {
        path: "register",
        loadComponent: () => import("./register/register").then(r => r.Register)
    },
    {
        path: "login2",
        loadComponent: () => import("./login2/login2").then(l2 => l2.Login2)
    }


];
