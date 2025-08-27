const OBSTICLE_SIZE = 70;
const OBSTICLE_HOLE_SIZE = 180;
const OBSTICLE_OFFSET_TOP = 40;
const CAP_HEIGHT = 36;
const OBSTICLE_OFFSET_BOTTOM = GROUND_HEIGHT + CAP_HEIGHT + 10;

class Obstacle {
    size = OBSTICLE_SIZE;
    holeSize = OBSTICLE_HOLE_SIZE;
    offsetTop = OBSTICLE_OFFSET_TOP;
    offsetBottom = OBSTICLE_OFFSET_BOTTOM;
    x;
    y;

    isPassed = false;
    constructor(pos = 0.5, holeY = 0.5) {
        this.x = pos;
        this.y = holeY;
    }

    update() {
        if (state.levelData.player.isAlive === false) return;
        this.x -= 0.0025;
        if (this.collision()) {
            // state.levelData.player.isAlive = false;
            state.levelData.player.damage(1);
        }

        const e1 = state.levelData.player;
        const e2 = this;

        if (
            !this.isPassed &&
            e1.x * config.width > e2.x * config.width + this.size / 2 + e1.size / 2
        ) {
            e1.points++;
            this.isPassed = true;
        }
    }

    collision() {
        const e1 = state.levelData.player;
        const e2 = this;

        const distanceX = Math.abs(e1.x - e2.x) * config.width;

        if (distanceX < e1.size / 2 + e2.size / 2) {
            const e1Pos = { x: e1.x * config.width, y: e1.y * config.height };
            const e2Pos = {
                x: this.x * config.width,
                y:
                    (config.height - (this.offsetTop + this.offsetBottom + this.holeSize)) *
                        this.y +
                    this.offsetTop +
                    this.holeSize / 2,
            };

            if (e1Pos.y < e2Pos.y - this.holeSize / 2 || e1Pos.y > e2Pos.y + this.holeSize / 2) {
                return true;
            }

            const points = [
                { x: e2Pos.x - this.size / 2, y: e2Pos.y - this.holeSize / 2 },
                { x: e2Pos.x + this.size / 2, y: e2Pos.y - this.holeSize / 2 },
                { x: e2Pos.x + this.size / 2, y: e2Pos.y + this.holeSize / 2 },
                { x: e2Pos.x - this.size / 2, y: e2Pos.y + this.holeSize / 2 },
            ];

            for (let i = 0; i < points.length; i++) {
                if (
                    state.levelData.player.size / 2 >
                    ((points[i].x - e1Pos.x) ** 2 + (points[i].y - e1Pos.y) ** 2) ** 0.5
                ) {
                    return true;
                }
            }

            if (distanceX < e2.size / 2) {
                if (e2Pos.y - this.holeSize / 2 + e1.size / 2 > e1Pos.y) return true;
                if (e2Pos.y + this.holeSize / 2 - e1.size / 2 < e1Pos.y) return true;
            }
        }

        return false;
    }

    render() {
        const obstacleWidth = this.size * state.scale;
        const holeSize = this.holeSize * state.scale;
        const offsetTop = this.offsetTop * state.scale;
        const offsetBottom = this.offsetBottom * state.scale;
        const calculatedY =
            (state.height - (offsetTop + offsetBottom + holeSize)) * this.y +
            offsetTop +
            holeSize / 2;

        const gradientShaft = c.createLinearGradient(
            state.width * this.x - obstacleWidth * 0.5,
            0,
            state.width * this.x + obstacleWidth * 0.5,
            0
        );
        gradientShaft.addColorStop(0, '#8bb149');
        gradientShaft.addColorStop(0.3, '#d6ef7f');
        gradientShaft.addColorStop(1, '#567e20');
        c.fillStyle = gradientShaft;

        const lineWidth = 4 * state.scale;

        //Shaft
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

        c.strokeStyle = '#0c0c0c';
        c.lineWidth = lineWidth;

        c.strokeRect(
            state.width * this.x - obstacleWidth * 0.5 + lineWidth / 2,
            0 - lineWidth / 2,
            obstacleWidth - lineWidth,
            calculatedY - holeSize / 2
        );

        c.strokeRect(
            state.width * this.x - obstacleWidth * 0.5 + lineWidth / 2,
            calculatedY + holeSize / 2,
            obstacleWidth - lineWidth,
            state.height - (calculatedY + offsetTop)
        );

        const gradientHat = c.createLinearGradient(
            state.width * this.x - obstacleWidth * 0.5,
            0,
            state.width * this.x + obstacleWidth * 0.5,
            0
        );
        gradientHat.addColorStop(0, '#8bb149');
        gradientHat.addColorStop(0.1, '#d6ef7f');
        gradientHat.addColorStop(1, '#567e20');
        c.fillStyle = gradientHat;

        const capHeight = CAP_HEIGHT * state.scale;

        c.fillRect(
            state.width * this.x - obstacleWidth * 0.5,
            calculatedY - holeSize / 2 - capHeight,
            obstacleWidth,
            capHeight
        );

        c.fillRect(
            state.width * this.x - obstacleWidth * 0.5,
            calculatedY + holeSize / 2,
            obstacleWidth,
            capHeight
        );

        //Upper Tube Hat
        c.strokeRect(
            state.width * this.x - obstacleWidth * 0.5 - lineWidth / 2,
            calculatedY - holeSize / 2 - capHeight,
            obstacleWidth + lineWidth,
            capHeight
        );
        //Lower Tube Hat
        c.strokeRect(
            state.width * this.x - obstacleWidth * 0.5 - lineWidth / 2,
            calculatedY + holeSize / 2,
            obstacleWidth + lineWidth,
            capHeight
        );

        // c.fillRect(state.width * this.x - 5, calculatedY - 5, 10, 10);
    }
}
