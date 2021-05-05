import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {UserService} from './user.service';

@Injectable()
export class AlgorithmsService<T> {

  headers;
  apiUrl: string;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    userService.updateTokenFromCookie();
    this.apiUrl = environment.apiUrl;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + this.userService.token
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
          headers: {
            Authorization: 'JWT ' + this.userService.token
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events'
        }
      );
  }

  listUploads() {
    return this.http.get(`${this.apiUrl}/algorithms/list-uploads`, {headers: this.headers});
  }

}
