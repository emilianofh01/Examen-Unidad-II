export const LinePointSlope = (p, x1, y1, x2, y2) => {
  if (x1 === x2) {
    let y = Math.min(y1, y2);
    const yEnd = Math.max(y1, y2);
    while (y < yEnd) {
      p.point(x1, y);
      y++;
    }
    return;
  }

  const m = (y2 - y1) / (x2 - x1);
  const b = Math.round(y1 - m * x1);

  let x = Math.min(x1, x2);
  const xEnd = Math.max(x1, x2);
  while (x <= xEnd) {
    const y = m * x + b;
    p.point(x, y);
    x++;
  }
};
