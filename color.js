class Color {
    static random() {
        return new Color(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255,
        )
    }

    constructor(r, g, b, a = 255) {
        let normalize = (i) => {
            //return i % 256;
            
            i = i % 256;
            if (i < 0) i = 256 + i;
            return Math.floor(i);
        }

        this.r = normalize(r);
        this.g = normalize(g);
        this.b = normalize(b);
        this.a = normalize(a);
    }
}