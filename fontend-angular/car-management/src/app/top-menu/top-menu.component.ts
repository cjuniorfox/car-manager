import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})


export class TopMenuComponent implements OnInit {

  constructor(private _router: Router) { }

  breadcrumbList: Array<any> = [];


  ngOnInit() {
    this.listenRouting();
  }

  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;
        routerList = routerUrl.slice(1).split('/');
        routerList.forEach((router, index) => {
          this.breadcrumbList.push({
            name: router,
            path: (index === 0) ? '' : `${this.breadcrumbList[index - 1].path}/${router}`
          });
        });

      }
    });
  }

}
