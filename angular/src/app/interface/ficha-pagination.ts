import { Ficha } from './ficha';

export interface FichaPagination {
    message: string,
    count: number,
    skip: number,
    pageSize: number,
    data: Ficha
}