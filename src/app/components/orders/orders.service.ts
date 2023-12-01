import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdersModel } from './orders.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Codebook } from 'src/app/shared/models/models';

@Injectable({ providedIn: 'root' })
export class OrdersService {

    constructor(
        private http: HttpClient,
        private fileUploadService: FileUploadService
    ) { }


    getOrders(): Observable<OrdersModel[]> {
        return this.http.get<OrdersModel[]>(`${environment.apiUrl}/Order/GetAll`);
    }

    getById(id: number): Observable<OrdersModel> {
        return this.http.get<OrdersModel>(`${environment.apiUrl}/Order/GetById?id=${id}`);
    }

    createOrder(order: OrdersModel): Observable<OrdersModel> {
        return this.http.post<OrdersModel>(`${environment.apiUrl}/Order/Create`, order);
    }

    updateOrder(order: OrdersModel): Observable<OrdersModel> {
        return this.http.post<OrdersModel>(`${environment.apiUrl}/Order/Update`, order);
    }

    deleteOrder(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/Order/DeleteOrderById?id=${id}`);
    }

    uploadDocument(file: File, name: string) {
        return this.fileUploadService.postMultipart(`${environment.apiUrl}/Order/UploadDocument?name=${name}`, file);
    }

    getAdrCalculatedValues(adrWeight: number, unNumber: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/Order/GetADRCalculatedValues`, { mass: adrWeight, number: unNumber, language: 'English' });
    }
}