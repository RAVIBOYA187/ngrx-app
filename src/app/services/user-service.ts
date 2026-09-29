import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class UserService {



    private http = inject(HttpClient)

    getUsersURL = "https://dummyjson.com/users";
    loginUserURL = "https://dummyjson.com/user/login"

    getUsers() {
        return this.http.get<UserResponse>(this.getUsersURL)
    }

    loginUser(data: { username: string | null, password: string | null }) {
        return this.http.post<any>(this.loginUserURL, data)
    }
}

interface UserResponse {
    users: any[];
    total: number;
    skip: number;
    limit: number;
}
