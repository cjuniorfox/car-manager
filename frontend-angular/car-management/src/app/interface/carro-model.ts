import { RequestModel } from './request-model';
export interface CarroModeloModel {
    nome: string,
    _id,
    request: RequestModel
};

export interface CarroModel {
    marca: String,
    modelos: Array<CarroModeloModel>,
    _id: Number,
    request: RequestModel;
};
