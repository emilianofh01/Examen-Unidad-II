export const bresenham = (p, x1, y1, x2, y2) => {
  const { abs } = Math;

  let diferenciaX = abs(x2 - x1);
  let diferenciaY = abs(y2 - y1);

  let esPendienteMayor = diferenciaY > diferenciaX;
  if (esPendienteMayor) {
    [x1, y1] = [y1, x1];
    [x2, y2] = [y2, x2];
    [diferenciaX, diferenciaY] = [diferenciaY, diferenciaX];
  }

  let incrementoX = x2 > x1 ? 1 : -1;
  let incrementoY = y2 > y1 ? 1 : -1;

  let error = diferenciaX / 2;

  for (let i = 0; i <= diferenciaX; i++) {
    if (esPendienteMayor) {
      p.point(y1, x1);
    } else {
      p.point(x1, y1);
    }

    error += diferenciaY;
    if (error >= diferenciaX) {
      if (esPendienteMayor) {
        y1 += incrementoY;
      } else {
        x1 += incrementoX;
      }
      error -= diferenciaX;
    }

    if (esPendienteMayor) {
      x1 += incrementoX;
    } else {
      y1 += incrementoY;
    }
  }
};
