type isBomb = boolean;

export interface IPosition {
    x: number;
    y: number;
    isBomb: boolean;
}

export interface IPositionArgs {
    newPropTest?: string;
}
