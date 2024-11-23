class Player {
    size;
    speed;
    x;
    y;
    distance = 0;
    points = 0;
    velocity = 0;
    isAlive = true;
    hp = 1;
    maxHp = 1;

    constructor() {
        this.speed = 0.0002;
        this.size = 50;
        this.y = 0.5;
        this.x = 0.5 - this.size / config.width / 2;
    }

    update() {
        if (this.isAlive) {
            this.distance++;
            if (state.input.up === true) {
                this.velocity = -0.008;
                state.input.up = false;
            }
        }

        this.velocity += this.speed;
        this.y += this.velocity;
    }

    damage(amount) {
        if (!this.isAlive) return;
        this.hp -= amount;
        if (this.hp <= 0) {
            this.isAlive = false;
            end();
        }
    }

    render() {
        c.fillStyle = 'blue';
        c.beginPath();
        const birdSize = this.size * state.scale;
        c.arc(state.width * this.x, this.y * state.height, birdSize / 2, 0, 2 * Math.PI);
        c.fill();
    }
}
