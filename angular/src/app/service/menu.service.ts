import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu(): Array<any> {
    const menu = [
      { name: 'Home', path: '/', icon: 'home' },
      { name: 'Entrada', path: '/controle/entrada', icon: 'arrow_upward' },
      { name: 'Controle', path: '/controle', icon: 'playlist_add_check' },
      {
        name: 'Mais opções', path:"/opcao", icon: 'settings_applications', dropdown: [
          { name: 'Gerenciar Usuários', path: '/opcao/usuario' },
          { divider: true },
          { name: 'Clientes', path: '/cliente' },
          { name: 'Carros', path: '/carro' },
          { divider: true },
          { name: 'Relatório Gerencial', path: '/relatorio-gerencial' }
        ]
      }
    ];
    return menu;
  }
}
