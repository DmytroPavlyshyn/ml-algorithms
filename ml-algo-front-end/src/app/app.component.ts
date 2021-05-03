import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ml-algo-front-end';
  isAuthenticated = false;

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this.isAuthenticated = true;
    }
  }

  logout() {
    if (this.userService.isAuthenticated()) {
      this.userService.logout();
    }
  }
}
