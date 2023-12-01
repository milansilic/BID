import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Codebook } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CodebookService {

    constructor(
        private http: HttpClient,
        private fileUploadService: FileUploadService
    ) { }

    getOrderMakers(): Observable<Array<Codebook>> {
        return this.http.get<Array<Codebook>>(`${environment.apiUrl}/Codebook/GetOrderMakerCodebook`);
    }

    getClientCodebook(): Observable<Array<Codebook>> {
        return this.http.get<Array<Codebook>>(`${environment.apiUrl}/Codebook/GetClientCodebook`);
    }

    getTourCodebook(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/Codebook/GetTourCodebook`);
    }

    getDutiesCodebook(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/Codebook/GetDutiesCodebook`);
    }

    getCostTypeCodebook(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/Codebook/GetCostTypesCodebook`);
    }
}