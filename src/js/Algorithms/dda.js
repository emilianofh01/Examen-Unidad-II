export const dda = (p, x1, y1, x2, y2) => {
  const { round, abs } = Math;

  let dx = x2 - x1;
  let dy = y2 - y1;

  let pasos;
  if (abs(dx) > abs(dy)) {
    pasos = abs(dx);
  } else {
    pasos = abs(dy);
  }

  let incrementoX = dx / pasos;
  let incrementoY = dy / pasos;

  let x = x1;
  let y = y1;

  for (let i = 0; i <= pasos; i++) {
    p.point(round(x), round(y));
    x = x + incrementoX;
    y = y + incrementoY;
  }
};
