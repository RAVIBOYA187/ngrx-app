import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class ProductService {

    private http = inject(HttpClient)

    // productsURL = "https://fakestoreapi.com/products";

    // productsURL = "https://fakestoreapi.noksha.dev/api/walmartproducts"
    // productsURL = "https://fakestoreapi.noksha.dev/api/products"

    productsURL = "https://api.escuelajs.co/api/v1/products"

    // productsURL = "https://dummyjson.com/products"
    getProducts() {
        return this.http.get<ApiProduct[]>(this.productsURL)
    }



}

// export interface ApiProduct {
//     id: number;
//     title: string;
//     brand: string;
//     category: string;
//     description: string;
//     image: string;
//     isNew: boolean;
//     oldPrice: number;
//     price: number;
// }

// export interface ProductsResponse {
//     data: ApiProduct[];
// totalProducts: number;
// totalPages: number;
// currentPage: number;
// perPage: number;
// }

export interface ApiProduct {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;

    category: {
        id: number;
        name: string;
        slug: string;
        image: string;
        creationAt: string;
        updatedAt: string;
    };

    images: string[];

    creationAt: string;
    updatedAt: string;
}