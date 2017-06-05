import { IField } from './IField';

export interface IBattle {
    isOver: boolean;
    field: IField;
}

export interface IBattleArgs {
    newPropTest?: string;
}
