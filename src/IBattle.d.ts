import { IField } from './IField';

export interface IBattle {
    isOver: boolean;
    field: IField;
    marks: number;
    bombsMarked: number;
    winner: boolean;
    message?: string;
}

export interface IBattleArgs {
    newPropTest?: string;
}
