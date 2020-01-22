import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuService } from '../service/menu.service';
import { AuthService } from '../service/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) { }

  menu: Array<any> = [];

  ngOnInit() {
    this.menu = this.menuService.getMenu();
    //    this.listenRouting();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get loggedUser() {
    return this.authService.getLoggedUser();
  }

  logout() {
    this.authService.logout().subscribe(
      () => this.router.navigate(['/user/login']),
      err => console.error(err)
    );
  }

}
