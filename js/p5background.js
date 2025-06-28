export function startP5Background() {
  new p5(sketch => {
    let t = 0;

    sketch.setup = () => {
      const c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      c.position(0, 0);
      c.style('z-index', '-2');
      sketch.colorMode(sketch.HSB, 360, 100, 100, 100);
      sketch.noFill();
      sketch.blendMode(sketch.ADD);
    };

    sketch.windowResized = () => {
      sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    };

    sketch.draw = () => {
      sketch.background(0, 0, 0, 10);
      sketch.translate(sketch.width / 2, sketch.height / 2);
      let prevX = null;
      let prevY = null;
      for (let i = 0; i < 600; i++) {
        const a = i * 0.05 + t;
        const r = 220 * sketch.sin(3 * a + t) * sketch.cos(4 * a - t);
        const x = r * sketch.cos(a);
        const y = r * sketch.sin(a);
        if (prevX !== null) {
          sketch.stroke((i * 2 + t * 50) % 360, 80, 100, 80);
          sketch.line(prevX, prevY, x, y);
        }
        prevX = x;
        prevY = y;
      }
      t += 0.005;
    };
  });
}
