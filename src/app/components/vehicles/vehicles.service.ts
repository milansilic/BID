import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehiclesModel } from './vehicles.model';


@Injectable({ providedIn: 'root' })
export class VehiclesService {

    constructor(
        private http: HttpClient
    ) { }

    getAllVehicles(): Observable<VehiclesModel[]> {
        return this.http.get<VehiclesModel[]>(`${environment.apiUrl}/Vehicle/GetAll`);
    }

    getVehicle(id: number): Observable<VehiclesModel> {
        return this.http.get<VehiclesModel>(`${environment.apiUrl}/Vehicle/GetById?id=${id}`);
    }

    createVehicle(vehicle: VehiclesModel): Observable<VehiclesModel> {
        return this.http.post<VehiclesModel>(`${environment.apiUrl}/Vehicle/Create`, vehicle);
    }

    updateVehicle(vehicle: VehiclesModel): Observable<VehiclesModel> {
        return this.http.put<VehiclesModel>(`${environment.apiUrl}/Vehicle/Update`, vehicle);
    }

    deleteVehicle(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/Vehicle/DeleteById?id=${id}`);
    }

    //temp 
    getInsuranceCompanyDropdown(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/ServiceCompany/dropdown`);
    }

}