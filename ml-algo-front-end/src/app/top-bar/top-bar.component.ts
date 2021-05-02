import {Component, OnInit} from '@angular/core';
import {AlgorithmsService} from '../algorithms.service';
import {UserService} from '../user.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {


  isAuthenticated = false;

  constructor(
    private algorithmsService: AlgorithmsService<any>,
    public userService: UserService
  ) {
  }

  fileToUpload: File = null;

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this.isAuthenticated = true;
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    this.algorithmsService.postFile(this.fileToUpload).subscribe(s => {
      console.log(s);
    });
  }

  logout() {
    if (this.userService.isAuthenticated()) {
      this.userService.logout();
    }
  }
}
