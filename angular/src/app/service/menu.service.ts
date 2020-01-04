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
      { name: 'Saida', path: '/controle/saida', icon: 'arrow_downward' },
      {
        name: 'Mais opções', path:"/opcao", icon: 'settings_applications', dropdown: [
          { name: 'Controle de serviço', path: '/controle' },
          { divider: true },
          { name: 'Clientes', path: '/cliente' },
          { name: 'Carros', path: '/carro' },
          { divider: true },
          { name: 'Gerenciar Usuários', path: '/opcao/usuario' },
          { name: 'Permissões', path: '/opcao/permissao' },
          { divider: true },
          { name: 'Relatório Gerencial', path: '/relatorio-gerencial' },
          { divider: true },
          { name: 'Logout', path: '/logout' }
        ]
      }
    ];
    return menu;
  }
}
