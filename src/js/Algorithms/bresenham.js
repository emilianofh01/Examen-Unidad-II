export const bresenham = (p, x0, y0, x1, y1) => {
  const { abs } = Math;

  let deltaX = abs(x1 - x0);
  let deltaY = abs(y1 - y0);
  const signoX = x1 >= x0 ? 1 : -1;
  const signoY = y1 >= y0 ? 1 : -1;

  const esPendienteMayor = deltaY > deltaX;

  if (esPendienteMayor) {
    [x0, y0] = [y0, x0];
    [x1, y1] = [y1, x1];
    [deltaX, deltaY] = [deltaY, deltaX];
  }

  let error = deltaX / 2;

  let x = x0;
  let y = y0;

  for (let i = 0; i <= deltaX; i++) {
    if (esPendienteMayor) {
      p.point(x, y);
    } else {
      p.point(x, y);
    }

    error += deltaY;
    if (error >= deltaX) {
      if (esPendienteMayor) {
        x += signoX;
      } else {
        y += signoY; 
      }
      error -= deltaX;
    }

    if (esPendienteMayor) {
      y += signoY;
    } else {
      x += signoX;
    }
  }
};
