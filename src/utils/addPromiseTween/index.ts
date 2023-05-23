export const addPromiseTween = (
  scene: Phaser.Scene,
  config: (Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenBuilderConfig) & {
    onComplete?: VoidFunction;
  },
) =>
  new Promise<void>((resolve) =>
    scene.add.tween({
      ...config,
      onComplete: () => {
        config.onComplete?.();
        resolve();
      },
    }),
  );
