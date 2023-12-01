import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from './users.model';

@Injectable({ providedIn: 'root' })
export class UsersService {

    constructor(
        private http: HttpClient
    ) { }

    getAllUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${environment.apiUrl}/User/GetAll`);
    }

    getUser(id: number): Observable<UserModel> {
        return this.http.get<UserModel>(`${environment.apiUrl}/User/GetById?id=${id}`);
    }

    createUser(user: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(`${environment.apiUrl}/User/Create`, user);
    }

    updateUser(user: UserModel): Observable<UserModel> {
        return this.http.put<UserModel>(`${environment.apiUrl}/User/Update`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/User/DeleteById?id=${id}`);
    }

}