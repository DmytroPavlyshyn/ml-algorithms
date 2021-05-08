import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from '../../environments/environment';

import {HttpClient} from "@angular/common/http";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public notifier: NotifierService,
    public http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.http.post(`${environment.apiUrl}/auth/user`, this.form.getRawValue())
          .subscribe((resp) => {
            this.notifier.notify("success", "User created successfully")

          }, (error) => {
            this.notifier.notify("error", "User already exists")
          })
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
