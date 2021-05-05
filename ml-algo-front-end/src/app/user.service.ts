import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {NotifierService} from "angular-notifier";

@Injectable()
export class UserService {

  private userTokenKey = 'token';

  private apiUrl: string;

  private httpOptions: any;

  public token: string;

  public tokenExpires: Date;

  public username: string;

  public errors: any = [];

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router,
              private notifier: NotifierService
  ) {
    this.apiUrl = environment.apiUrl;

    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  public login(user) {
    this.http.post(`${this.apiUrl}/api-token-auth/`, JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
        window.location.reload();
        this.notifier.notify("success", "You authorized successfully")
      },
      err => {
        this.errors = err.error;
        this.notifier.notify("error", "Username/Password is invalid")
        return false;
      }
    );
  }

  public refreshToken() {
    this.http.post(`${this.apiUrl}/api-token-refresh`, JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.tokenExpires = null;
    this.username = null;
    this.cookieService.delete(this.userTokenKey);
    window.location.reload();
  }

  private parseToken(token: string) {
    if (token != null && token.length !== 0) {
      const tokenParts = this.token.split(/\./);
      return JSON.parse(window.atob(tokenParts[1]));
    } else {
      return false;
    }
  }

  public updateTokenFromCookie() {
    const token = this.cookieService.get(this.userTokenKey);
    if (token != null) {
      this.updateData(token);
    }
  }

  private updateData(token) {
    this.token = token;
    const tokenDecoded = this.parseToken(token);
    this.tokenExpires = new Date(tokenDecoded.exp * 1000);
    this.cookieService.set(this.userTokenKey, token, this.tokenExpires);
    this.username = tokenDecoded.username;
    this.errors = [];
    this.router.navigateByUrl('/');
  }

  public isAuthenticated() {
    const check = () => {
      return this.token != null &&
        this.tokenExpires != null &&
        this.tokenExpires > new Date();
    };
    if (check() === false) {
      this.updateTokenFromCookie();
      if (check() === false) {
        return false;
      }
    }
    return true;

  }

}
