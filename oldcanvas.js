window.addEventListener('load', () => {
    
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight - 12;
    canvas.width = window.innerWidth - 12;

    //let painting = false;
    let startX = null;
    let startY = null;

    function startPosition(e) {
        startX = e.clientX;
        startY = e.clientY;
    };

    function finishedPosition(e) {
        //painting = false;
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 5;
        ctx.strokeRect(startX, startY, e.clientX, e.clientY);
        startX = null;
        startY = null;
    };

    // function draw(e) {
    //     if(!painting) return;
    //     ctx.lineWidth = 10;
    //     ctx.lineCap = "round";

    //     ctx.lineTo(e.clientX, e.clientY);
    //     ctx.stroke();
    //     ctx.beginPath();
    //     ctx.moveTo(e.clientX, e.clientY);
    // };

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    //canvas.addEventListener("mousemove", draw);
});