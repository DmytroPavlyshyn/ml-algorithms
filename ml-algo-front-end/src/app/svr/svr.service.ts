import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Svr } from './svr';

@Injectable({
  providedIn: 'root'
})
export class SvrService {

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

  submit(form: Svr) {
    return this.http.post(`${this.apiUrl}/algorithms/svr`, JSON.stringify(form),
      {
        headers: this.headers,
        responseType: 'json'
      });
  }
}
