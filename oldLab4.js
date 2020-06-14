window.addEventListener('load', () => {
    const { ipcRenderer } = require('electron');
    const { Shape, EllipseShape } = require("./Shape.js");

    const MyEditor = require("./Editor.js");

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let lastMouseY, lastMouseX;
    let mouseX, mouseY;

    let curColor;
    let curShape;
    let curFill;

    let mousedown = false;

    let shapes = [];

    function getSettings() {
        ipcRenderer.send('getSettings');
        ipcRenderer.on('letSettings', (event, color, shape, fill) => {
            curColor = color;
            curShape = shape;
            curFill = fill;
        });
    }

    function drawEllipse(ellipse) {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.ellipse(ellipse.centerX, ellipse.centerY, ellipse.rw, ellipse.rh, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function drawShapes() {
        ctx.strokeStyle = curColor;
        ctx.lineWidth = 5;
        shapes.forEach(drawEllipse)
    }

    function startPosition(e) {
        getSettings();
        lastMouseX = parseInt(e.clientX);
        lastMouseY = parseInt(e.clientY);
        mousedown = true;
    }

    function rubberBand(e) {
        if (!mousedown) return;

        mouseX = parseInt(e.clientX);
        mouseY = parseInt(e.clientY);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawShapes();

        ctx.beginPath();
        ctx.setLineDash([4]);
        let width = mouseX - lastMouseX;
        let height = mouseY - lastMouseY;
        ctx.rect(lastMouseX, lastMouseY, width, height);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function finishedPosition(e) {
        mousedown = false;

        mouseX = parseInt(e.clientX);
        mouseY = parseInt(e.clientY);

        let width = mouseX - lastMouseX;
        let height = mouseY - lastMouseY;

        const rw = Math.abs(width / 2);
        const rh = Math.abs(height / 2);

        let centerX = mouseX - width / 2;
        let centerY = mouseY - height / 2;

        shapes.push({ centerX, centerY, rw, rh })

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawShapes();
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mousemove", rubberBand);
    canvas.addEventListener("mouseup", finishedPosition);
});