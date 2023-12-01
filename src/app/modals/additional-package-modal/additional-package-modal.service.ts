import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyModel } from './additional-package-modal.model';
import { FileUploadService } from '../../services/file-upload.service'

@Injectable({ providedIn: 'root' })
export class CompanyService {

    constructor(
        private http: HttpClient,
        private fileUploadService: FileUploadService
    ) { }

    getCompany(): Observable<CompanyModel> {
        return this.http.get<CompanyModel>(`${environment.apiUrl}/Company/GetMyCompany`);
    }

    createCompany(company: CompanyModel): Observable<CompanyModel> {
        return this.http.post<CompanyModel>(`${environment.apiUrl}/Company/Create`, company);
    }

    updateCompany(company: CompanyModel): Observable<CompanyModel> {
        return this.http.put<CompanyModel>(`${environment.apiUrl}/Company/Update`, company);
    }

    uploadProfilePhoto(file: File) {
        return this.fileUploadService.postMultipart(`${environment.apiUrl}/Company/UploadProfilePhoto`, file);
    }

    deleteProfilePhoto(): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/Company/DeleteProfilePhoto`);
    }

    deleteDepartment(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/Company/DeleteDepartment/${id}`);
    }

}