import { RequestModel } from './request-model';
export class CarroModeloModel {
    nome: String;
    _id;
    request: RequestModel;
};

export class CarroModel {
    marca: String;
    modelos: Array<CarroModeloModel>;
    _id: Number;
    request: RequestModel;
};
