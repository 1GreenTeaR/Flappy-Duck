class Player {
    size;
    speed;
    y;
    distance = 0;
    velocity = 0;

    constructor(){
        this.speed = 0.0002;
        this.size = 50;
        this.y = 0.5;
    }

    update(){
        this.distance++;
        this.velocity +=this.speed;
        this.y += this.velocity;
        if (state.input.up === true) {
          this.velocity = -0.008;
          state.input.up = false;
        }
    }

    render(){
        c.beginPath();
        const birdSize = this.size * state.scale;
        c.arc(
          state.width / 2 - birdSize,
          this.y * state.height,
          birdSize / 2,
          0,
          2 * Math.PI
        );
        c.fill();
    }
}