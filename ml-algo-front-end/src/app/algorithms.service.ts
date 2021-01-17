import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService<T> {

  headers;
  apiUrl: string;

  constructor(
    private http: HttpClient,
  ) {
    this.apiUrl = environment.apiUrl;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  submit(form: T, subRoute: string) {

    return this.http.post(`${this.apiUrl}/algorithms/${subRoute}`, JSON.stringify(form),
      {
        headers: this.headers,
        responseType: 'json'
      });
  }

  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .post(`${this.apiUrl}/algorithms/upload`, formData,
        {
          responseType: 'text'
        }
      );
  }

  listUploads() {
    return this.http.get(`${this.apiUrl}/algorithms/list-uploads`);
  }

}
