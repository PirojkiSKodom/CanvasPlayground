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
            i = i % 256;
            if (i < 0) i = 256 + i;
            return i;
        }

        this.r = Math.floor(normalize(r));
        this.g = Math.floor(normalize(g));
        this.b = Math.floor(normalize(b));
        this.a = Math.floor(normalize(a));
    }
}