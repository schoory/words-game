export const getStringColorFromColorObject = (color: Phaser.Types.Display.ColorObject) =>
  Phaser.Display.Color.RGBToString(color.r, color.g, color.b, color.a);
