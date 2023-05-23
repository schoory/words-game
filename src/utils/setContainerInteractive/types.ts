export type GetHitAreaCallbackParams = {
  originX: number;
  originY: number;
};

export type SetContainerInteractiveParams = {
  targetContainer: Phaser.GameObjects.Container;
  options?: {
    cursor?: string;
  };
  boundRect?: Phaser.Geom.Rectangle;
};
