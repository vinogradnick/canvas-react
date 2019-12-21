import { action, computed, IObservableValue, observable } from "mobx";

export class CooridanteSize {
    @observable X: IObservableValue<number>;
    @observable Y: IObservableValue<number>;
    @observable HEIGHT: IObservableValue<number>;
    @observable WIDTH: IObservableValue<number>;
    @observable active: IObservableValue<boolean>;

    constructor(x, y) {
        this.Y = observable.box(y);
        this.X = observable.box(x);
        this.HEIGHT = observable.box(750);
        this.WIDTH = observable.box(1000);
        this.active = observable.box(false);
    }
    @action setActive() {
        this.active.set(!this.active.get());
    }

    @computed get CENTER_HEIGHT() {
        return this.HEIGHT.get() / 2 - (this.active.get() ? this.getY : 0);

    }

    @computed get LOCAL_CENTER_HEIGHT() {
        return this.getHEIGHT + this.getY;
    }

    @computed get LOCAL_CENTER_WIDTH() {
        return this.getWidth + this.getX;
    }

    @computed get CENTER_WIDTH() {
        return this.WIDTH.get() / 2 + (this.active.get() ? this.getX : 0);
    }

    @computed get getHEIGHT() {
        return this.HEIGHT.get();
    }

    @computed get getWidth() {
        return this.WIDTH.get();
    }

    @computed
    public get getX() {
        return this.X.get();
    }

    @action
    public setX(v: number) {
        this.X.set(v);
    }

    @computed
    public get getY() {
        return this.Y.get();
    }

    @action
    public setY(v: number) {
        console.log(v);
        this.Y.set(v);
    }


}
