import { IPosition, IPositions } from './IPosition';

export const allPositions = (positions: IPositions): IPosition[] =>
    positions.reduce((a, b) => a.concat(b));
