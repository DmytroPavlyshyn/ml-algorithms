import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * An object representing the user for the login form
   */
  public user: any;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this.userService.login({username: this.user.username, password: this.user.password});

  }

}
