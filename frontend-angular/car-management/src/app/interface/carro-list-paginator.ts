import { CarroMarcaModelo } from './carro-marca-modelo';

export interface CarroListPaginator {
        count: number,
        skip: number,
        pagesize: number,
        carros: Array<CarroMarcaModelo>
}
