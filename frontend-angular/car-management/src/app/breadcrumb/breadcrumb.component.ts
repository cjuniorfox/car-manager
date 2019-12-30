import { Component, OnInit } from '@angular/core';
import { MenuService } from '../service/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbList: Array<any> = [];
  menu : Array<any> = [];

  constructor(private _router: Router,private menuService:MenuService) { }

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
          //se menu vazio, procura no submenu
          if(!menu){
            this.menu.find(f => {
              menu = Array.isArray(f.dropdown) ? f.dropdown.find( fd => fd.path === path) : null;
            });
          }
          this.breadcrumbList.push({
            name: menu ? menu.name : decodeURI(router),
            path: path
          });
        });
      }
    });
  }


}
