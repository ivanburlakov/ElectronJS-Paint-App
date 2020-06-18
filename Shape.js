class Shape {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

class PointShape extends Shape {
    static label = 'Point (Brush)';

    DrawPoint(x1, y1, x2, y2) {
        window.global.ctx.setLineDash([]);
        window.global.ctx.lineJoin = 'round';
        window.global.ctx.strokeStyle = 'black';
        window.global.ctx.lineWidth = 4;

        window.global.ctx.beginPath();

        if (x1 === x2 && y1 === y2) {
            window.global.ctx.beginPath();
            window.global.ctx.arc(x1, y1, 2, 0, Math.PI * 2, true);
            window.global.ctx.closePath();
            window.global.ctx.fillStyle = 'black';
            window.global.ctx.fill();
        }

        else {
            window.global.ctx.moveTo(x1, y1);
            window.global.ctx.lineTo(x2, y2);
            window.global.ctx.closePath();
            window.global.ctx.stroke();
        }
    }

    Draw() {
        this.DrawPoint(this.x1, this.y1, this.x2, this.y2);
    }
}

class LineShape extends Shape {
    static label = 'Line';

    BeginPath() {
        window.global.ctx.beginPath();
        window.global.ctx.setLineDash([]);
        window.global.ctx.lineJoin = 'round';
    }

    ClosePath(color, fill, close) {
        if (close === true) {
            window.global.ctx.closePath();
        }

        if (fill === true) {
            window.global.ctx.fillStyle = color;
            window.global.ctx.fill();
        }

        window.global.ctx.strokeStyle = 'black';
        window.global.ctx.lineWidth = 4;
        window.global.ctx.stroke();
    }

    StartLine(x1, y1) {
        window.global.ctx.moveTo(x1, y1);
    }

    DrawLine(x2, y2) {
        window.global.ctx.lineTo(x2, y2);
    }

    Draw() {
        this.BeginPath();
        this.StartLine(this.x1, this.y1)
        this.DrawLine(this.x2, this.y2);
        this.ClosePath(false, null, false);
    }
}

class RectShape extends Shape {
    static label = 'Rectangle';

    constructor(x1, y1, x2, y2, color, fill) {
        super(x1, y1, x2, y2);
        this.color = color;
        this.fill = fill;
        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
    }

    DrawRect(x1, y1, width, height) {
        window.global.ctx.beginPath();
        window.global.ctx.setLineDash([]);
        window.global.ctx.rect(x1, y1, width, height);
        if (this.fill === true) {
            window.global.ctx.fillStyle = this.color;
            window.global.ctx.fill();
        }
        window.global.ctx.strokeStyle = 'black';
        window.global.ctx.lineWidth = 4;
        window.global.ctx.stroke();
    }

    Draw() {
        this.DrawRect(this.x1, this.y1, this.width, this.height);
    }
}

class EllipseShape extends Shape {
    static label = 'Ellipse';

    constructor(x1, y1, x2, y2, color, fill) {
        super(x1, y1, x2, y2);
        this.color = color;
        this.fill = fill;
        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
        this.rw = Math.abs(this.width / 2);
        this.rh = Math.abs(this.height / 2);
        this.centerX = this.x2 - this.width / 2;
        this.centerY = this.y2 - this.height / 2;
    }

    DrawEllipse(centerX, centerY, rw, rh, color, fill) {
        window.global.ctx.beginPath();
        window.global.ctx.setLineDash([]);
        window.global.ctx.ellipse(centerX, centerY, rw, rh, 0, 0, 2 * Math.PI);
        if (fill === true) {
            window.global.ctx.fillStyle = color;
            window.global.ctx.fill();
        }
        window.global.ctx.strokeStyle = 'black';
        window.global.ctx.lineWidth = 4;
        window.global.ctx.stroke();
    }

    Draw() {
        this.DrawEllipse(this.centerX, this.centerY, this.rw, this.rh, this.color, this.fill);
    }
}

class LineOOShape extends EllipseShape {
    static label = 'Line \'n\' Circles';
    
    DrawOO() {
        function buildUnitVector(p1, p2, uVect) {
            uVect.x = (p2.x - p1.x);
            uVect.y = (p2.y - p1.y);
            let vectorNorm = Math.sqrt(Math.pow(uVect.x, 2) + Math.pow(uVect.y, 2));
            uVect.x /= vectorNorm;
            uVect.y /= vectorNorm;
        }

        function drawShorterLine(p1, p2, a, b) {
            buildUnitVector(p1, p2, unitVector);
            sp1.x = p1.x + unitVector.x * a;
            sp1.y = p1.y + unitVector.y * a;
            sp2.x = p2.x - unitVector.x * b;
            sp2.y = p2.y - unitVector.y * b;
            window.global.ctx.beginPath();
            window.global.ctx.setLineDash([]);
            window.global.ctx.strokeStyle = 'black';
            window.global.ctx.lineWidth = 4;
            window.global.ctx.lineJoin = 'round';
            window.global.ctx.moveTo(sp1.x, sp1.y);
            window.global.ctx.lineTo(sp2.x, sp2.y);
            window.global.ctx.stroke();
        }

        let unitVector = { x: 0, y: 0 };
        let sp1 = { x: 0, y: 0 };
        let sp2 = { x: 0, y: 0 };

        // use with
        let p1 = { x: this.x1, y: this.y1 };
        let p2 = { x: this.x2, y: this.y2 };

        drawShorterLine(p1, p2, 10, 10);
    }

    Draw() {
        this.DrawOO();
        super.DrawEllipse(this.x1, this.y1, 10, 10, this.color, this.fill);
        super.DrawEllipse(this.x2, this.y2, 10, 10, this.color, this.fill);
    }
}

class CubeShape extends LineShape {
    static label = 'Cube';

    constructor(x1, y1, x2, y2, color, fill) {
        super(x1, y1, x2, y2);
        this.color = color;
        this.fill = fill;
        this.width = this.x2 - this.x1;
        this.height = this.y2 - this.y1;
    }

    DrawCube(x1, y1, x2, y2, color, fill) {
        let fullWidth = 0;
        let sideWidth = 0;
        let leftWidth = 0;
        let startX = 0;
        let startY = 0;

        if (Math.abs(this.width) >= Math.abs(this.height)) {
            fullWidth = Math.abs(this.height);
            sideWidth = parseInt(fullWidth / Math.sqrt(2));
            leftWidth = fullWidth - sideWidth;
        }

        else {
            fullWidth = Math.abs(this.width);
            sideWidth = parseInt(fullWidth / Math.sqrt(2));
            leftWidth = fullWidth - sideWidth;
        }

        if (this.width >= 0) {
            startX = x1;
        }

        else {
            startX = x1 - fullWidth;
        }

        if (this.height >= 0) {
            startY = y1 + fullWidth;
        }

        else {
            startY = y1;
        }

        super.BeginPath();
        super.StartLine(startX, startY);
        super.DrawLine(startX, startY - sideWidth);
        super.DrawLine(startX + sideWidth, startY - sideWidth);
        super.DrawLine(startX + sideWidth, startY);
        super.ClosePath(color, fill, true);

        super.BeginPath();
        super.StartLine(startX, startY - sideWidth);
        super.DrawLine(startX + leftWidth, startY - fullWidth);
        super.DrawLine(startX + fullWidth, startY - fullWidth);
        super.DrawLine(startX + sideWidth, startY - sideWidth);
        super.ClosePath(color, fill, true);

        super.BeginPath();
        super.StartLine(startX + fullWidth, startY - fullWidth);
        super.DrawLine(startX + fullWidth, startY - leftWidth);
        super.DrawLine(startX + sideWidth, startY);
        super.DrawLine(startX + sideWidth, startY - sideWidth);
        super.ClosePath(color, fill, true);

        if (fill === false) {
            super.BeginPath();
            super.StartLine(startX + leftWidth, startY - fullWidth);
            super.DrawLine(startX + leftWidth, startY - leftWidth);
            super.DrawLine(startX, startY);
            super.ClosePath(color, fill, false);

            super.StartLine(startX + leftWidth, startY - leftWidth);
            super.DrawLine(startX + fullWidth, startY - leftWidth);
            super.ClosePath(color, fill, false);
        }
    }

    Draw() {
        this.DrawCube(this.x1, this.y1, this.x2, this.y2, this.color, this.fill);
    }
}

module.exports = { PointShape, LineShape, RectShape, EllipseShape, LineOOShape, CubeShape };