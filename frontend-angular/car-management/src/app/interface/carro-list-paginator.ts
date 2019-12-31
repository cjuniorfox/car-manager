import { CarroMarcaModelo } from './carro-marca-modelo';

export interface CarroListPaginator {
        message: string,
        count: number,
        skip: number,
        pagesize: number,
        carros: Array<CarroMarcaModelo>
}
