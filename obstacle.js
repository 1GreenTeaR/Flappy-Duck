class Obstacle {
    size = 50;
    holeSize = 150;
    offsetTop = 75;
    offsetBottom = 75;
    x;
    y;

    constructor(pos = 0.5, holeY = 0.5) {
        this.x = pos;
        this.y = holeY;
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
            const e1Pos = { x: e1.x * config.width, y: e1.y * config.height };
            const e2Pos = {
                x: this.x * config.width,
                y: (config.height - (this.offsetTop + this.offsetBottom)) * this.y + this.offsetTop,
            };

            const points = [
                { x: e2Pos.x - this.size / 2, y: e2Pos.y - this.holeSize / 2 },
                { x: e2Pos.x + this.size / 2, y: e2Pos.y - this.holeSize / 2 },
                { x: e2Pos.x + this.size / 2, y: e2Pos.y + this.holeSize / 2 },
                { x: e2Pos.x - this.size / 2, y: e2Pos.y + this.holeSize / 2 },
            ];

            console.log(e2Pos, points);

            for (let i = 0; i < points.length; i++) {
                if (
                    player.size / 2 >
                    ((points[i].x - e1Pos.x) ** 2 + (points[i].y - e1Pos.y) ** 2) ** 0.5
                ) {
                    return true;
                }
            }
        }
    }

    render() {
        const obstacleWidth = this.size * state.scale;
        const holeSize = this.holeSize * state.scale;
        const offsetTop = this.offsetTop * state.scale;
        const offsetBottom = this.offsetBottom * state.scale;
        const calculatedY = (state.height - (offsetTop + offsetBottom)) * this.y + offsetTop;

        if (this.collision()) {
            c.fillStyle = 'blue';
        } else {
            c.fillStyle = 'red';
        }

        c.fillRect(
            state.width * this.x - obstacleWidth * 0.5,
            0,
            obstacleWidth,
            calculatedY - holeSize / 2
        );

        c.fillRect(
            state.width * this.x - obstacleWidth * 0.5,
            calculatedY + holeSize / 2,
            obstacleWidth,
            state.height - (calculatedY + offsetTop)
        );

        c.fillRect(state.width * this.x - 5, calculatedY - 5, 10, 10);
    }
}
