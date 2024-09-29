class Obstacle {
    width = 50;
    holeSize = 150;
    pos;
    holeY;

    constructor(pos) {
        this.pos = pos;
        this.holeY = 0.5;
    }
    
    update() {
        this.pos -= 0.001;
    }

    render() {
        const obstacleWidth = this.width * state.scale;
        const holeSize = this.holeSize * state.scale;

        c.fillRect(
            (state.width * this.pos) - obstacleWidth * 0.5,
            0,
            obstacleWidth,
            (state.height * this.holeY) - (holeSize / 2)
          );

        c.fillRect(
            (state.width * this.pos) - obstacleWidth * 0.5,
            (state.height * this.holeY) + (holeSize / 2),
            obstacleWidth,
            state.height - ((state.height * this.holeY) + (holeSize / 2))
          );


    }
}
