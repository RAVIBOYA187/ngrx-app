import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class ProductService {

    private http = inject(HttpClient)

    productsURL = "https://fakestoreapi.com/products";

    getProducts() {
        return this.http.get<any[]>(this.productsURL)
    }
}
