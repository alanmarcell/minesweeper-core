type isBomb = boolean;

export interface IPosition {
    x: number;
    y: number;
    isBomb: boolean;
    nearBombs: number;
    opened: false;
    marked: number;
}

export interface IPositionArgs {
    newPropTest?: string;
}
