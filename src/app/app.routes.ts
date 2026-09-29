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
        path: "signup",
        loadComponent: () => import("./signup/signup").then(s => s.Signup)
    },
    {
        path: "cart",
        loadComponent: () => import("./cart/cart").then(c => c.Cart)
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
