type isBomb = boolean;

export interface IPosition extends IPositionArgs {
    isBomb: boolean;
    nearBombs: number;
    opened: boolean;
    marked: number;
    isValid: boolean;
}

export interface IPositionArgs {
    x: number;
    y: number;
}
