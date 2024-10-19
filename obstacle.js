class Obstacle {
    size = 50;
    holeSize = 150;
    x;
    holeY;

    constructor(pos = 0.5, holeY = 0.5) {
        this.x = pos;
        this.holeY = holeY;
    }

    update() {
        this.x -= 0.0015;
        this.collision();
    }

    collision() {
        const e1 = player;
        const e2 = this;

        const distanceX = Math.abs(e1.x - e2.x) * config.width;

        if (distanceX < e1.size / 2 + e2.size / 2) {
        }
    }

    render() {
        const obstacleWidth = this.size * state.scale;
        const holeSize = this.holeSize * state.scale;
        const offsetTop = holeSize / 2;
        const offsetBottom = holeSize / 2;
        const calculatedY = (state.height - (offsetTop + offsetBottom)) * this.holeY + offsetTop;

        if (this.collision()) {
            c.fillStyle = 'blue';
        } else {
            c.fillStyle = 'red';
        }

        c.fillRect(
            state.width * this.x - obstacleWidth * 0.5,
            0,
            obstacleWidth,
            calculatedY - offsetTop
        );

        c.fillRect(
            state.width * this.x - obstacleWidth * 0.5,
            calculatedY + offsetTop,
            obstacleWidth,
            state.height - (calculatedY + offsetTop)
        );

        c.fillRect(state.width * this.x - 5, calculatedY - 5, 10, 10);
    }
}
