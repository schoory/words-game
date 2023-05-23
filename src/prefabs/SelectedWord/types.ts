export type CreateTranslateTweenParam = {
  getWorldTransformMatrix: (
    tempMatrix?: Phaser.GameObjects.Components.TransformMatrix,
    parentMatrix?: Phaser.GameObjects.Components.TransformMatrix,
  ) => Phaser.GameObjects.Components.TransformMatrix;
};

export type CreateColorTweenParam = {
  from: string | number;
  to: string | number;
};
