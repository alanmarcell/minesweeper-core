import { IPosition } from './IPosition';

export type IField = IPosition[][];

export interface IFieldSize {
    x: number;
    y: number;
}

export interface IFieldConfig {
    size: IFieldSize;
    bombs: number;
}
