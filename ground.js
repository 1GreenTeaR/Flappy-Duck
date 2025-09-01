const GROUND_HEIGHT = 60;
const LAND_HEIGHT = 10;
const LINE_HEIGHT = 4;
const BLANK_WIDTH = 14;

class Ground {
    offset = 0;

    constructor() {}

    update() {
        if (!state.levelData.player.isAlive) return;

        this.offset += config.width * 0.0025;
    }

    render() {
        const groundHeight = GROUND_HEIGHT * state.scale;
        c.fillStyle = '#ddd895';
        c.fillRect(
            0,
            state.height - groundHeight + LINE_HEIGHT * state.scale,
            state.width,
            groundHeight
        );
        c.fillStyle = '#76bd31';
        c.fillRect(
            0,
            state.height - groundHeight + LINE_HEIGHT * state.scale,
            state.width,
            11 * state.scale
        );
        c.fillStyle = '#0c0c0c';
        c.fillRect(0, state.height - groundHeight, state.width, LINE_HEIGHT * state.scale);

        c.fillStyle = '#c8a247';
        c.fillRect(
            0,
            state.height - groundHeight + (LAND_HEIGHT - 1 + LINE_HEIGHT * 2) * state.scale,
            state.width,
            (LINE_HEIGHT + 1) * state.scale
        );

        c.fillStyle = '#5d8a1f';
        c.fillRect(
            0,
            state.height - groundHeight + (LAND_HEIGHT + LINE_HEIGHT) * state.scale,
            state.width,
            LINE_HEIGHT * state.scale
        );

        const tiltOffset = 6 * state.scale;
        const blankWidth = BLANK_WIDTH * state.scale;
        const blankHeight = LAND_HEIGHT * state.scale;
        c.fillStyle = '#98e55b';
        c.beginPath();

        const startY = state.height - groundHeight + LINE_HEIGHT * state.scale;
        let startX = 0 - (this.offset % (BLANK_WIDTH * 2)) * state.scale;
        c.moveTo(startX, startY);
        c.lineTo(startX - tiltOffset, startY + blankHeight);
        c.lineTo(startX - tiltOffset + blankWidth, startY + blankHeight);
        c.lineTo(startX + blankWidth, startY);

        c.fill();

        for (startX; startX < state.width; startX += blankWidth * 2) {
            c.beginPath();
            c.moveTo(startX, startY);
            c.lineTo(startX - tiltOffset, startY + blankHeight);
            c.lineTo(startX - tiltOffset + blankWidth, startY + blankHeight);
            c.lineTo(startX + blankWidth, startY);

            c.fill();
        }
    }
}
