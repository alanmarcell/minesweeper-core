import { IPosition } from './IPosition';

export type IField = IPosition[][];

export interface IFieldSize {
    width: number;
    heigth: number;
}

export interface IFieldConfig extends IFieldSize {
    bombs: number;
}
