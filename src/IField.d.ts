import { IPosition } from './IPosition';

export type IField = IPosition[][];

export interface IFieldSize {
    width: number;
    height: number;
}

export interface IFieldConfig extends IFieldSize {
    bombs: number;
}
