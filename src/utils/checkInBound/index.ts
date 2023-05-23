export type Bound = {
  x: number;
  y: number;
  width: number;
  height: number;
  originX: number;
  originY: number;
};

export type Position = {
  x: number;
  y: number;
};

export const checkInBound = (bound: Bound, position: Position) => {
  const startX = bound.x - bound.width * bound.originX;
  const endX = startX + bound.width;
  const startY = bound.y - bound.height * bound.originY;
  const endY = startY + bound.height;

  return position.x >= startX && position.x <= endX && position.y >= startY && position.y <= endY;
};
