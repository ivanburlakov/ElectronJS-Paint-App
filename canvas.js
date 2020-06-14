window.addEventListener('load', () => {
    require('events').defaultMaxListeners = 9999;
    const { ipcRenderer } = require('electron');

    const Shape = require("./Shape.js");
    const PointShape = Shape.PointShape;
    const LineShape = Shape.LineShape;
    const RectShape = Shape.RectShape;
    const EllipseShape = Shape.EllipseShape;
    const LineOOShape = Shape.LineOOShape;
    const CubeShape = Shape.CubeShape;

    // const MyEditor = require("./Editor.js");

    window.global.canvas = document.getElementById('canvas');
    window.global.ctx = canvas.getContext('2d');

    window.global.canvas.height = window.innerHeight;
    window.global.canvas.width = window.innerWidth;

    let x1, y1, x2, y2;

    let currentObj;

    let curColor, curShape, curFill;

    let shapes = [];

    let mousedown = false;

    function startPosition(e) {
        ipcRenderer.send('getSettings');
        ipcRenderer.on('letSettings', (event, color, shape, fill) => {
            curColor = color;
            curShape = shape;
            curFill = fill;
        });

        mousedown = true;

        x1 = parseInt(e.clientX);
        y1 = parseInt(e.clientY);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => shape.Draw());
    }

    function show(e) {
        if (!mousedown) return;

        x2 = parseInt(e.clientX);
        y2 = parseInt(e.clientY);

        if (curShape === 'PointShape') {
            shapes.push(new PointShape(x1, y1, x2, y2, curColor, curFill));

            x1 = parseInt(e.clientX);
            y1 = parseInt(e.clientY);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            shapes.forEach(shape => shape.Draw());

            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => shape.Draw());

        ctx.beginPath();
        ctx.setLineDash([4]);
        let width = x2 - x1;
        let height = y2 - y1;
        ctx.rect(x1, y1, width, height);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function finishedPosition(e) {
        mousedown = false;

        x2 = parseInt(e.clientX);
        y2 = parseInt(e.clientY);

        eval(`shapes.push(new ${curShape}(x1, y1, x2, y2, curColor, curFill)) `);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => shape.Draw());
    }

    window.global.canvas.addEventListener("mousedown", startPosition);
    window.global.canvas.addEventListener("mousemove", show);
    window.global.canvas.addEventListener("mouseup", finishedPosition);
});