class Color {
    static random() {
        return new Color(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255,
            255
        )
    }

    constructor(r, g, b, a = 255) {
        this.r = Math.floor(r % 256);
        this.g = Math.floor(g % 256);;
        this.b = Math.floor(b % 256);;
        this.a = Math.floor(a % 256);;
    }
}