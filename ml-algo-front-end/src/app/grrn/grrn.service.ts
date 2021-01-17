import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Grrn } from './grrn';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GrrnService {
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

  submit(form: Grrn) {
    return this.http.post(`${this.apiUrl}/algorithms/grrn`, JSON.stringify(form),
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }
}
