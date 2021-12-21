let ctx = canvas.getContext('2d');

ctx.fillWithData = function (fillFunc) {
    const imageData = this.getImageData(0,0,camera.width, camera.height);
    const data = imageData.data;

    let i = 0;
    for (let y = 0; y < camera.height; y++) {
        for (let x = 0; x < camera.width; x++) {

            let tx = (x - camera.center.x) * camera.zoom + camera.x;
            let ty = (y - camera.center.y) * camera.zoom + camera.y;

            let cl = fillFunc(tx, ty);

            data[i++] = cl.r; // red
            data[i++] = cl.g; // green
            data[i++] = cl.b; // blue
            data[i++] = cl.a; // alpha
        }
    }
    this.putImageData(imageData, 0, 0);
}

function update() {
    canvas.width = document.getElementById('frame').clientWidth;
    canvas.height = document.getElementById('frame').clientHeight;

    camera.width = canvas.width;
    camera.height = canvas.height;

    camera.center.x = camera.width / 2;
    camera.center.y = camera.height / 2;


    if (keysPressed.has('KeyW')) camera.y -= camera.speed;
    if (keysPressed.has('KeyA')) camera.x -= camera.speed;
    if (keysPressed.has('KeyS')) camera.y += camera.speed;
    if (keysPressed.has('KeyD')) camera.x += camera.speed;

    if (keysPressed.has('KeyZ')) camera.zoom /= camera.zoomSpeed;
    if (keysPressed.has('KeyX')) camera.zoom *= camera.zoomSpeed;

    if (keysPressed.has('KeyC')) camera.reset();

    draw(ctx);

    //setTimeout(update, 100);//update again after 100 milliseconds
    window.requestAnimationFrame(update); //update asap (60fps)
}

let camera = new function () {
    this.reset = ()=>{
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
