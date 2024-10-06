class Obstacle {
    width = 50;
    holeSize = 150;
    pos;
    holeY;

    constructor(pos = 0.5, holeY = 0.5) {
        this.pos = pos;
        this.holeY = holeY;
    }
    
    update() {
        this.pos -= 0.0015;
    }

    render() {
        const obstacleWidth = this.width * state.scale;
        const holeSize = this.holeSize * state.scale;

        c.fillRect(
            (state.width * this.pos) - obstacleWidth * 0.5,
            0,
            obstacleWidth,
            holeSize / 2 + ((state.height - holeSize) * this.holeY) - (holeSize / 2)
          );

          c.fillRect(
            (state.width * this.pos) - obstacleWidth * 0.5,
            holeSize / 2 + ((state.height - holeSize) * this.holeY) + (holeSize / 2),
            obstacleWidth,
            state.height - (holeSize / 2 + ((state.height - holeSize) * this.holeY) + (holeSize / 2))
          );

          c.fillRect(
            (state.width * this.pos) - 5,
            holeSize / 2 + ((state.height - holeSize) * this.holeY) - 5,
            10,
            10
          );


    }
}
