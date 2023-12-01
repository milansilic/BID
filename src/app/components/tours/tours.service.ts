import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToursModel } from './tours.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Injectable({ providedIn: 'root' })
export class ToursService {

    constructor(
        private http: HttpClient,
        private fileUploadService: FileUploadService
    ) { }

    getTours(): Observable<ToursModel[]> {
        return this.http.get<ToursModel[]>(`${environment.apiUrl}/Tour/GetAll`);
    }

    getToursById(id: number): Observable<ToursModel> {
        return this.http.get<ToursModel>(`${environment.apiUrl}/Tour/GetById?id=${id}`);
    }

    createTour(tour: ToursModel): Observable<ToursModel> {
        return this.http.post<ToursModel>(`${environment.apiUrl}/Tour/Create`, tour);
    }

    uploadDocument(file: File, name: string) {
        return this.fileUploadService.postMultipart(`${environment.apiUrl}/Tour/UploadDocument?name=${name}`, file);
    }

    uploadLicenceDocument(file: File, name: string) {
        return this.fileUploadService.postMultipart(`${environment.apiUrl}/Tour/UploadLicenceDocument?name=${name}`, file);
    }

    updateTour(tour: ToursModel): Observable<ToursModel> {
        return this.http.put<ToursModel>(`${environment.apiUrl}/Tour/Update`, tour);
    }

    deleteTour(id: number): Observable<ToursModel> {
        return this.http.delete<ToursModel>(`${environment.apiUrl}/Tour/DeleteById?id=${id}`);
    }
}