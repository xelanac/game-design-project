class SnakeCell {
    constructor(posX, posY, size) {

        this._posX = posX;
        this._posY = posY;
        this._size = size;
    }

    get posX() {
        return this._posX;
    }

    set posX(value) {
        this._posX = value;
    }

    get posY() {
        return this._posY;
    }

    set posY(value) {
        this._posY = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    leftMovement(x, constSpeed) {
        return x -= constSpeed;
    }

    rightMovement(x, constSpeed) {
        return x += constSpeed;
    }

    downMovement(y, constSpeed) {
        return y += constSpeed;
    }

    upMovement(y, constSpeed) {
        return y -= constSpeed;
    }

    movement(newPosX, newPosY) {
        this._posX = newPosX;
        this._posY = newPosY;
    }
}