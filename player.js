class Player {
    // size;
    width;
    height;
    speed;
    x;
    y;
    distance = 0;
    points = 0;
    velocity = 0;
    isAlive = true;
    hp = 1;
    maxHp = 1;
    temp = 0;

    constructor() {
        this.speed = 0.0002;
        // this.size = 50;
        this.width = 120;
        this.height = 40;
        this.y = 0.5;
        this.x = 0.5 - this.width / config.width / 2;

        const image = fetch('assets/bird.png').then(async (data) => {
            let img = new Image();
            img.onload = () => {
                this.image = img;

                const canvas = document.createElement('canvas');
                canvas.width = this.width * 3;
                canvas.height = this.height * 3;
                const ctx = canvas.getContext('2d');

                ctx.imageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                this.canvas = canvas;

                ctx.imageSmoothingEnabled = true;
                ctx.webkitImageSmoothingEnabled = true;
                ctx.mozImageSmoothingEnabled = true;
            };
            img.src = URL.createObjectURL(await data.blob());
        });
    }

    update() {
        if (this.isAlive) {
            this.distance++;
            if (state.input.up === true) {
                this.velocity = -0.008;
                state.input.up = false;
            }
        }

        this.velocity += this.speed * config.speed;
        this.y += this.velocity * config.speed;
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
        const degrees = this.velocity * 20 * Math.PI;
        function draw(c, image, x, y, width, height, degrees) {
            c.save();
            c.translate(x, y);
            c.rotate(degrees);
            c.drawImage(image, -width / 2, -height / 2, width, height);

            c.restore();
        }

        const birdSize = { width: this.width * state.scale, height: this.height * state.scale };
        // if (this.canvas) {
        if (false) {
            c.imageSmoothingEnabled = false;
            draw(
                c,
                this.canvas,
                state.width * this.x,
                this.y * state.height,
                birdSize.width,
                birdSize.height,
                degrees
            );
        } else {
            c.fillStyle = collision ? 'red' : 'blue';
            c.beginPath();

            c.ellipse(
                state.width * this.x,
                this.y * state.height,
                birdSize.width / 2,
                birdSize.height / 2,
                0,
                0,
                2 * Math.PI
            );
            c.fill();

            c.fillStyle = 'white';

            c.fillRect(
                state.width * this.x + data.x * state.scale - 5,
                this.y * state.height - data.y * state.scale - 5,
                10,
                10
            );
        }
    }
}
