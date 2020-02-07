import { User } from './user';
import { ServicoEnum } from '../enum/servico.enum';
import { SetorEnum } from '../enum/setor.enum';
import { BoxEnum } from '../enum/box.enum';

export interface Servico {
    user: User,
    servico: ServicoEnum,
    setor: SetorEnum,
    box: BoxEnum,
    descricao: string,
    inicio: Date,
    fim: Date,
    _id: string
}