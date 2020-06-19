window.addEventListener('load', () => {
    const { Menu } = require('electron').remote;

    const About = require('./About.js');

    const constants = require('../modules/constants.js');

    const Shape = require("../modules/Shape.js");

    const colors = constants.colors;

    let color = '#ffff00';
    let shape = 'PointShape';
    let fill = true;

    const PointShape = Shape.PointShape;
    const LineShape = Shape.LineShape;
    const RectShape = Shape.RectShape;
    const EllipseShape = Shape.EllipseShape;
    const LineOOShape = Shape.LineOOShape;
    const CubeShape = Shape.CubeShape;

    function colorSwitch(newColorName, newColorCode) {
        color = newColorCode;

        for (const e in colors) {
            menu.getMenuItemById(e.name).checked = false;
        }

        menu.getMenuItemById(newColorName).checked = true;
    }

    function initColors(defaultColorCode) {
        const submenu = [];

        colors.forEach((e) => {
            const menuItem = {
                label: e.name,
                id: e.name,
                type: 'checkbox',
                checked: false,
                click() {
                    colorSwitch(e.name, e.code);
                }
            }

            if (e.code === defaultColorCode) {
                menuItem.checked = true;
                color = defaultColorCode;
            }

            submenu.push(menuItem);
        });

        return submenu;
    }

    function shapeSwitch(newShapeName) {
        shape = newShapeName;

        Object.keys(Shape).forEach((e) => {
            menu.getMenuItemById(e).checked = false;
        });

        menu.getMenuItemById(newShapeName).checked = true;
    }

    function initShapes(defaultShapeName) {
        const submenu = [];

        Object.keys(Shape).forEach((e) => {
            const menuItem = {
                label: Shape[e].label,
                id: e,
                type: 'checkbox',
                checked: false,
                click() {
                    shapeSwitch(e);
                }
            }

            if (e === defaultShapeName) {
                menuItem.checked = true;
                shape = defaultShapeName;
            }

            submenu.push(menuItem);
        });

        return submenu;
    }

    const menu = Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    label: 'Close',
                    role: "quit",
                },
                {
                    label: 'Reload',
                    role: "reload",
                },
            ],
        },
        {
            label: "Color",
            submenu: initColors(color)
        },
        {
            label: "Shape",
            submenu: initShapes(shape)
        },
        {
            label: "Fill",
            submenu: [
                {
                    label: 'On',
                    id: 'fillOn',
                    type: 'checkbox',
                    checked: true,
                    click() {
                        menu.getMenuItemById('fillOff').checked = false;
                        menu.getMenuItemById('fillOn').checked = true;
                        fill = true;
                    },
                },
                {
                    label: 'Off',
                    id: 'fillOff',
                    type: 'checkbox',
                    checked: false,
                    click() {
                        menu.getMenuItemById('fillOn').checked = false;
                        menu.getMenuItemById('fillOff').checked = true;
                        fill = false;
                    },
                },
            ],
        },
        {
            label: "Help",
            submenu: [
                {
                    label: 'About',
                    click() {
                        About.Create(win);
                    },
                },
            ],
        },
    ])
    Menu.setApplicationMenu(menu);

    // const MyEditor = require("./Editor.js");

    window.global.canvas = document.getElementById('canvas');
    window.global.ctx = canvas.getContext('2d');

    function setCanvasSize() {
        window.global.canvas.height = window.innerHeight;
        window.global.canvas.width = window.innerWidth;
    }

    setCanvasSize();

    let x1, y1, x2, y2;

    let currentObj;

    let shapes = [];

    let mousedown = false;

    function startPosition(e) {
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

        if (shape === 'PointShape') {
            shapes.push(new PointShape(x1, y1, x2, y2, color, fill));

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

        eval(`shapes.push(new ${shape}(x1, y1, x2, y2, color, fill))`);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => shape.Draw());
    }

    window.global.canvas.addEventListener("mousedown", startPosition);
    window.global.canvas.addEventListener("mousemove", show);
    window.global.canvas.addEventListener("mouseup", finishedPosition);

    window.onresize = () => {
        setCanvasSize();
        shapes.forEach(shape => shape.Draw());
    }
});