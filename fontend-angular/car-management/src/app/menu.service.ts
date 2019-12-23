import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu(): Array<any> {
    const menu = [
      { name: 'Home', path: '/', icon: 'home' },
      { name: 'Entrada', path: '/controle/entrada', icon: 'arrow-up' },
      { name: 'Saida', path: '/controle/saida', icon: 'arrow-down' },
      {
        name: 'configurações', icon: 'tasks', dropdown: [
          { name: 'Gerenciar Usuários', path: '/' },
          { name: 'Permissões', path: '/' },
          { divider: true },
          { name: 'Relatório Gerencial', path: '/' },
          { divider: true },
          { name: 'Logout', path: '/' }
        ]
      }
    ];
    return menu;
  }
}
