import { IPositions } from './IPosition';

export interface IField {
    positions: IPositions;
    fieldConfig: IFieldConfig;
}

export interface IFieldSize {
    width: number;
    height: number;
}

export interface IFieldConfig extends IFieldSize {
    bombs: number;
}
