import { checkInBound } from '../checkInBound';
import { GetHitAreaCallbackParams, SetContainerInteractiveParams } from './types';

export const getHitAreaCallback =
  ({ originX, originY }: GetHitAreaCallbackParams) =>
  (hitarea: Phaser.Geom.Rectangle, x: number, y: number) => {
    const bound = {
      x: 0,
      y: 0,
      width: hitarea.width,
      height: hitarea.height,
      originX: originX,
      originY: originY,
    };
    return checkInBound(bound, { x, y });
  };

export const setContainerInteractive = ({
  targetContainer,
  boundRect,
  options = {},
}: SetContainerInteractiveParams) => {
  if (targetContainer.input) return;

  if (boundRect) {
    return targetContainer.setInteractive({
      hitArea: boundRect,
      hitAreaCallback: getHitAreaCallback({
        originX: targetContainer.originX,
        originY: targetContainer.originY,
      }),
      coursor: options.cursor,
    });
  }

  boundRect = targetContainer.getBounds();
  targetContainer.setInteractive({
    hitArea: boundRect,
    hitAreaCallback: getHitAreaCallback({
      originX: targetContainer.originX,
      originY: targetContainer.originY,
    }),
    coursor: options.cursor,
  });
};
