function myff(x, y){
    let r = 0;
    let g = x * x + y * y + i;
    let b = 0;
    return new Color(r, g, b);
}

let i = 0;
function draw(ctx) {
    i += 10;
    ctx.fillWithData(myff);

}