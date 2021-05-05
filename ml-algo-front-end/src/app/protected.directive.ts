import {Directive, OnDestroy} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Directive({
  selector: '[appProtected]'
})
export class ProtectedDirective implements OnDestroy {
  private sub: any = null;

  constructor(private authService: UserService, private router: Router, private location: Location) {
    if (!authService.isAuthenticated()) {
      // this.location.replaceState('/');
      this.router.navigate(['auth']);
    }
  }

  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }
}
