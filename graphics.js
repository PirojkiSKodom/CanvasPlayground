let ctx = canvas.getContext('2d');

ctx.fillWithData = function (fillFunc) {
    const imageData = this.getImageData(0, 0, camera.width, camera.height);
    const data = imageData.data;

    let centerx = camera.x * camera.speed + camera.width / 2;
    let centery = camera.y * camera.speed + camera.height / 2;

    let i = 0;
    for (let y = 0; y < camera.height; y++) {
        for (let x = 0; x < camera.width; x++) {

            let tx = x - camera.width/2;
            let ty = y - camera.height/2;

            tx = tx * (1 + camera.zoom/100);
            ty = ty * (1 + camera.zoom/100);

            tx = centerx + tx  ;
            ty = centery + ty ;

 

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

    if (keysPressed.has('KeyW')) camera.y--;
    if (keysPressed.has('KeyA')) camera.x--;
    if (keysPressed.has('KeyS')) camera.y++;
    if (keysPressed.has('KeyD')) camera.x++;

    if (keysPressed.has('KeyZ')) camera.zoom++;
    if (keysPressed.has('KeyX')) camera.zoom--;


    draw(ctx);






    //setTimeout(update, 100);//update again after 100 milliseconds
    window.requestAnimationFrame(update); //update asap (60fps)
}

let camera = {
    x: 0,
    y: 0,
    zoom: 0,
    width: 500,
    height: 500,
    speed: 10,
}

let keysPressed = new Set();

document.onkeydown = (event) => {
    keysPressed.add(event.code);
}

document.onkeyup = (event) => {
    keysPressed.delete(event.code);
}
