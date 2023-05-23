import Phaser from 'phaser';
import { addPromiseTween } from 'src/utils/addPromiseTween';
import { getStringColorFromColorObject } from 'src/utils/getStringColorFromColorObject';
import { CreateColorTweenParam, CreateTranslateTweenParam } from './types';

export default class SelectedWord extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x ?? 640, y ?? 360, '', {});

    this.setOrigin(0.5, 0.5);
    this.text = 'Sample text';
    this.setStyle({
      backgroundColor: this.defaultFillColor,
      color: this.defaultTextColor,
      fontFamily: 'Roboto',
      fontSize: '32px',
      fontStyle: 'bold',
    });
    this.alpha = this.isShown ? 1 : 0;
    this.setPadding({ left: 9, top: 3, right: 9, bottom: 3 });

    scene.events.once('scene-awake', this.updateVisual.bind(this));
  }

  public isShown: boolean = true;
  public defaultFillColor: string = '#F4D584';
  public defaultTextColor: string = '#654900';
  public resolvedFillColor: string = '#8ACB00';
  public resolvedTextColor: string = '#FFFFFF';
  public errorFillColor: string = '#FF0000';
  public errorTextColor: string = '#FFFFFF';
  public isResolved: boolean = false;
  public isError: boolean = false;
  public animDuration: number = 200;

  public updateVisual() {
    this.alpha = this.isShown ? 1 : 0;
    this.setStyle({
      backgroundColor: this.isResolved ? this.resolvedFillColor : this.defaultFillColor,
      color: this.isResolved ? this.resolvedTextColor : this.defaultTextColor,
    });
  }

  public async updateVisualWithTween() {
    const oldFillColor = this.style.backgroundColor;
    const oldTextColor = this.style.color;

    const newFillColor = this.isResolved ? this.resolvedFillColor : this.defaultFillColor;
    const newTextColor = this.isResolved ? this.resolvedTextColor : this.defaultTextColor;

    const newAlpha = this.isShown ? 1 : 0;

    return Promise.all([
      this.createAlphaTween(newAlpha),
      this.isError
        ? this.createColorTween(
            { from: oldFillColor, to: this.errorFillColor },
            { from: oldTextColor, to: this.errorTextColor },
          )
        : this.createColorTween(
            { from: oldFillColor, to: newFillColor },
            { from: oldTextColor, to: newTextColor },
          ),
    ]);
  }

  public async resolve(useTween = true) {
    return this.updatePropertyWithUpdateVisual(() => (this.isResolved = true), useTween);
  }

  public async unresolve(useTween = true) {
    return this.updatePropertyWithUpdateVisual(() => (this.isResolved = false), useTween);
  }

  public async show(useTween = true) {
    return this.updatePropertyWithUpdateVisual(() => (this.isShown = true), useTween);
  }

  public async hide(useTween = true) {
    return this.updatePropertyWithUpdateVisual(() => (this.isShown = false), useTween);
  }

  public async setError(isError: boolean, useTween = true) {
    return this.updatePropertyWithUpdateVisual(() => (this.isError = isError), useTween);
  }

  public async translateToObject(object: CreateTranslateTweenParam) {
    const matrix = object.getWorldTransformMatrix(
      new Phaser.GameObjects.Components.TransformMatrix(),
      new Phaser.GameObjects.Components.TransformMatrix(),
    );
    const decomposedMatrix = matrix.decomposeMatrix();

    return await Promise.all([
      this.createTranslateTween(decomposedMatrix.translateX, decomposedMatrix.translateY),
      addPromiseTween(this.scene, { targets: this, scale: 0.5, duration: 200, yoyo: true }),
    ]);
  }

  protected async updatePropertyWithUpdateVisual(callback: () => void, useTween = true) {
    callback();

    if (useTween) await this.updateVisualWithTween();
    else this.updateVisual();
  }

  protected async createTranslateTween(x: number, y: number) {
    return addPromiseTween(this.scene, {
      targets: this,
      duration: this.animDuration,
      x,
      y,
      yoyo: true,
    });
  }

  protected async createAlphaTween(alpha: number) {
    return addPromiseTween(this.scene, {
      targets: this,
      duration: this.animDuration,
      alpha: alpha,
    });
  }

  protected async createColorTween(
    fillColor: CreateColorTweenParam,
    textColor: CreateColorTweenParam,
  ) {
    return new Promise<void>((resolve) => {
      this.scene.tweens.addCounter({
        from: 0,
        to: 100,
        duration: this.animDuration,
        onUpdate: (tween) => {
          const value = tween.getValue();

          const fillColorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
            Phaser.Display.Color.ValueToColor(fillColor.from),
            Phaser.Display.Color.ValueToColor(fillColor.to),
            100,
            value,
          );
          const textColorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
            Phaser.Display.Color.ValueToColor(textColor.from),
            Phaser.Display.Color.ValueToColor(textColor.to),
            100,
            value,
          );

          this.setStyle({
            backgroundColor: getStringColorFromColorObject(fillColorObject),
            color: getStringColorFromColorObject(textColorObject),
          });
        },
        onComplete: () => resolve(),
      });
    });
  }
}
