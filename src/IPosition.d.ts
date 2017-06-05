type isBomb = boolean;

export interface IPosition {
    x: number;
    y: number;
    isBomb: boolean;
    nearBombs: number;
}

export interface IPositionArgs {
    newPropTest?: string;
}
