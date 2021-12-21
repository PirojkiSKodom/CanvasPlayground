function myff(x, y){
    let r = 0;
    let g = 128 + 128*Math.sin((x**2  + y**2 + d)/50) ;
    let b = 0;
    return new Color(r, g, b);
}

let d = 0;
function draw(ctx) {
    d += 10;
    ctx.fillWithData(myff);
}

