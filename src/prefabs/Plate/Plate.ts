import Phaser from 'phaser';
import { addPromiseTween } from 'src/utils/addPromiseTween';
import { checkInBound } from 'src/utils/checkInBound';
import { CreateColorTweenParam, PlateState } from './types';

export default class Plate extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    letter?: string,
    cell?: { x: number; y: number },
  ) {
    super(scene, x ?? 0, y ?? 0);

    // Background
    const plateBackground = scene.add.rectangle(0, 0, 90, 90);
    plateBackground.isFilled = true;
    this.add(plateBackground);

    // Letter
    const plateLetter = scene.add.text(0, 0, '', {});
    plateLetter.setOrigin(0.5, 0.5);
    plateLetter.text = letter ?? '';
    plateLetter.setStyle({
      color: '#293671',
      fontFamily: 'Roboto',
      fontSize: '54px',
      fontStyle: 'bold',
    });
    this.add(plateLetter);

    this.plateLetter = plateLetter;
    this.plateBackground = plateBackground;
    this.cell = cell ?? { x: 0, y: 0 };

    this.registerListeners();
  }

  public static PLATE_SIZE: number = 90;

  public plateLetter: Phaser.GameObjects.Text;

  public plateBackground: Phaser.GameObjects.Rectangle;

  public cell: { x: number; y: number };

  public plateState: PlateState = 'unset';

  public animDuration: number = 200;

  public defaultFillColor: string = '#FFFFFF';

  public hoveredFillColor: string = '#FAEDCB';

  public pressedFillColor: string = '#F4D584';

  public resolvedFillColor: string = '#8ACB00';

  public defaultTextColor: string = '#293671';

  public hoveredTextColor: string = '#293671';

  public pressedTextColor: string = '#654900';

  public resolvedTextColor: string = '#FFFFFF';

  public errorFillColor: string = '#FF0000';

  public errorTextColor: string = '#FFFFFF';

  public disabledFillColor: string = '#D0D0D0';

  public disabledTextColor: string = '#717171';

  public isShown: boolean = true;

  public isHovered: boolean = false;

  public isError: boolean = false;

  public isDisabled: boolean = false;

  public setPlateState(plateState: PlateState) {
    if (this.plateState === plateState) return;
    return this.updatePropertyWithUpdateVisual(() => (this.plateState = plateState));
  }

  public show() {
    return this.updatePropertyWithUpdateVisual(() => (this.isShown = true));
  }

  public hide() {
    return this.updatePropertyWithUpdateVisual(() => (this.isShown = false));
  }

  public setError(isError: boolean) {
    return this.updatePropertyWithUpdateVisual(() => (this.isError = isError));
  }

  public enable() {
    return this.updatePropertyWithUpdateVisual(() => (this.isDisabled = false));
  }

  public disable() {
    return this.updatePropertyWithUpdateVisual(() => (this.isDisabled = true));
  }

  public async updateVisual() {
    const oldFillColor = this.plateBackground.fillColor;
    const oldTextColor = this.plateLetter.style.color;

    const { alpha, scale, fillColor, textColor } = this.getPlateTweenOptions();

    await Promise.all([
      addPromiseTween(this.scene, {
        targets: this,
        duration: this.animDuration,
        alpha,
        scale,
      }),
      this.createColorTween(
        { from: oldFillColor, to: fillColor },
        { from: oldTextColor, to: textColor },
      ),
    ]);
  }

  public setInteractive() {
    if (this.input) return this;

    super.setInteractive({
      hitArea: this.plateBackground,
      useHandCursor: true,
      hitAreaCallback: (hitarea: Phaser.Geom.Rectangle, x: number, y: number) => {
        const bound = {
          x: 0,
          y: 0,
          width: hitarea.width,
          height: hitarea.height,
          originX: this.originX,
          originY: this.originY,
        };
        return checkInBound(bound, { x, y });
      },
    });

    return this;
  }

  public destroy(fromScene?: boolean): void {
    this.off('pointerover', this.handlePointerOver).off('pointerout', this.handlePointerOut);
    super.destroy(fromScene);
  }

  protected async createColorTween(
    fillColor: CreateColorTweenParam,
    textColor: CreateColorTweenParam,
  ) {
    return new Promise<void>((resolve) =>
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

          const fill = Phaser.Display.Color.GetColor(
            fillColorObject.r,
            fillColorObject.g,
            fillColorObject.b,
          );
          const text = Phaser.Display.Color.RGBToString(
            textColorObject.r,
            textColorObject.g,
            textColorObject.b,
          );

          this.plateBackground.setFillStyle(fill);
          this.plateLetter.style.setColor(text);
        },
        onComplete: () => resolve(),
      }),
    );
  }

  protected registerListeners() {
    this.on('pointerover', this.handlePointerOver).on('pointerout', this.handlePointerOut);
  }

  protected handlePointerOver() {
    return this.updatePropertyWithUpdateVisual(() => (this.isHovered = true));
  }

  protected handlePointerOut() {
    return this.updatePropertyWithUpdateVisual(() => (this.isHovered = false));
  }

  protected async updatePropertyWithUpdateVisual(callback: () => void) {
    callback();
    return this.updateVisual();
  }

  protected getPlateTweenOptions() {
    const alpha = this.isShown ? 1 : 0;
    const scale = this.isDisabled || this.plateState === 'unset' ? 1 : 1.11;
    const [fillColor, textColor] = this.getPlateColors();
    return { alpha, scale, fillColor, textColor };
  }

  protected getPlateColors() {
    if (this.isDisabled) return [this.disabledFillColor, this.disabledTextColor];
    if (this.isError) return [this.errorFillColor, this.errorTextColor];
    switch (this.plateState) {
      case 'unset':
        if (this.isHovered) return [this.hoveredFillColor, this.hoveredTextColor];
        else return [this.defaultFillColor, this.defaultTextColor];
      case 'pressed':
        return [this.pressedFillColor, this.pressedTextColor];
      case 'resolved':
        return [this.resolvedFillColor, this.resolvedTextColor];
      default:
        return [this.defaultFillColor, this.defaultTextColor];
    }
  }
}
