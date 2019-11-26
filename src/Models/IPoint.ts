export interface IPoint<T> {
    x: number;
    y: number;
    z?: number;
    getX: number;
    getY: number;
    setY: number;
    setX: number;
    getZ: number;
    setZ: number;
    convert: T;
    minus: (point: T) => T;
    plus: (point: T) => T;
    lenBetween: (point: T) => number;
    toString: string;

}
