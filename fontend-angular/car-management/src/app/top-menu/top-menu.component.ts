import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})


export class TopMenuComponent implements OnInit {

  constructor(private _router: Router, private menuService: MenuService) { }

  breadcrumbList: Array<any> = [];

  menu : Array<any> = [];

  ngOnInit() {
    this.menu = this.menuService.getMenu();
    this.listenRouting();
  }

  listenRouting() {
    let routerUrl: string, path:string, routerList: Array<any>, target: any, menu: any;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;
        routerList = routerUrl.split('/');
        if (routerList.length === 2 && routerList[0] == routerList[1]){ //Corrige quando só home é exibido
          routerList = routerUrl.slice(1).split('/')
        }
        routerList.forEach((router, index) => {
          path = (index === 0) ? `/${router}` : `${this.breadcrumbList[index - 1].path}/${router}`.replace("//","/");
          menu = this.menu.find(f => f.path == path);
          this.breadcrumbList.push({
            name: menu ? menu.name : router,
            path: path
          });
        });
      }
    });
  }

}
