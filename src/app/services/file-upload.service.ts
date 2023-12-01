import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthTokenService } from 'src/authorization/services/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private authTokenService: AuthTokenService
  ) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  postMultipart(url: string, file: File) {

    let headers = new HttpHeaders();
    const token = AuthTokenService.getParsedToken();
    if (token) {
      headers = headers.set('Authorization', token);
    }

    const formData: FormData = new FormData();
    formData.append('file', file);

    const result = this.http.post(url, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(map((response) => {
      return response;
    }));

    return result;
  }


  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}