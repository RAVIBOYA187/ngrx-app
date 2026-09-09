import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "products",
        pathMatch: "full"
    },
    {
        path: "products",
        loadComponent: () => import("./products/products").then(p => p.Products)
    }, {
        path: "counter",
        loadComponent: () => import("./counter/counter").then(c => c.Counter)
    },
    {
        path: "login",
        loadComponent: () => import("./login/login").then(l => l.Login)
    },
    {
        path: "cart",
        loadComponent: () => import("./cart/cart").then(c => c.Cart)
    }
];
