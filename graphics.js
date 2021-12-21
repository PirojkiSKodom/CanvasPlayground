

let ctx = canvas.getContext('2d');


ctx.fillWithData = function (fillFunc) {
    let imageData = new ImageData(canvas.width, camera.height);

    let i = 0;
    for (let y = 0; y < camera.height; y++) {
        for (let x = 0; x < camera.width; x++) {

            let tx = (x - camera.center.x) * camera.zoom + camera.x;
            let ty = (y - camera.center.y) * camera.zoom + camera.y;

            let cl = fillFunc(tx, ty);

            imageData.data[i++] = cl.r; // red
            imageData.data[i++] = cl.g; // green
            imageData.data[i++] = cl.b; // blue
            imageData.data[i++] = cl.a; // alpha
        }
    }
    this.putImageData(imageData, 0, 0);
    imageData = null;
}

function update() {


    if (keysPressed.has('KeyW')) camera.y -= camera.speed * camera.zoom;
    if (keysPressed.has('KeyA')) camera.x -= camera.speed * camera.zoom;
    if (keysPressed.has('KeyS')) camera.y += camera.speed * camera.zoom;
    if (keysPressed.has('KeyD')) camera.x += camera.speed * camera.zoom;

    if (keysPressed.has('KeyZ')) camera.zoom /= camera.zoomSpeed;
    if (keysPressed.has('KeyX')) camera.zoom *= camera.zoomSpeed;

    if (keysPressed.has('Equal')) camera.zoomSpeed += 0.0001;
    if (keysPressed.has('Minus')) camera.zoomSpeed -= 0.0001;

    if (keysPressed.has('KeyC')) camera.reset();

    


    


    camX.innerHTML = `camera.x: ${camera.x.toFixed(0)}`;
    camY.innerHTML = `camera.y: ${camera.y.toFixed(0)}`;
    camZoom.innerHTML = `camera.zoom: ${camera.zoom.toFixed(3)}`;

    draw(ctx);

    //setTimeout(update, 100);//update again after 100 milliseconds
    window.requestAnimationFrame(update); //update asap (60fps)
}

let camera = new function () {
    this.reset = () => {
        this.x = 0;
        this.y = 0;
        this.zoom = 1;

        this.speed = 10;
        this.zoomSpeed = 1.01;

        this.width = canvas.width;
        this.height = canvas.height;

        this.center = {
            x: this.width / 2,
            y: this.height / 2,
        }
    }

    this.reset();
}

let keysPressed = new Set();

document.onkeydown = (event) => {
    keysPressed.add(event.code);
}

document.onkeyup = (event) => {
    keysPressed.delete(event.code);
}


canvas.resize = function () {
    canvas.width = frame.clientWidth;
    canvas.height = frame.clientHeight;

    frame.style.marginLeft = `${Math.floor((document.documentElement.clientWidth - frame.clientWidth) / 2)}px`;
    
    camera.width = canvas.width;
    camera.height = canvas.height;

    camera.center = {
        x: camera.width / 2,
        y: camera.height / 2,
    }
    
}

var observer = new MutationObserver(function (mutations) {
    canvas.resize();
});//edrity kostyl konshno

observer.observe(frame, { attributes: true, attributeFilter: ['style'] });