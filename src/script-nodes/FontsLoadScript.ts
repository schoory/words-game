// You can write more code here

/* START OF COMPILED CODE */

import Phaser from 'phaser';
import ScriptNode from '../script-nodes-basic/ScriptNode';
import { getIteratorValues } from '../utils/getIteratorValues';
import { loadFonts } from '../utils/loadFonts';
import { FontsOptions } from '../utils/loadFonts/types';
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FontsLoadScript extends ScriptNode {
  constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
    super(parent);

    /* START-USER-CTR-CODE */
    this.loadFonts = this.loadFonts.bind(this);
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */

  protected override awake(): void {
    this.scene.load.on(Phaser.Loader.Events.COMPLETE, this.loadFonts);
  }

  protected destroy(): void {
    this.scene.load.off(Phaser.Loader.Events.COMPLETE, this.loadFonts);
  }

  private loadFonts(): void {
    const fontsOptions = this.getFontsOptionsFromCache();
    const fontFaces = getIteratorValues(document.fonts.values());
    const diff = this.getFontsDiff(fontsOptions, fontFaces);

    if (diff.length > 0) {
      loadFonts(diff);
    }
  }

  private getFontsDiff(fontsOptions: FontsOptions, fontFaces: FontFace[]): FontsOptions {
    return fontsOptions.filter(
      (fontOptions) =>
        !fontFaces.some((fontFace) => {
          const isDisplaySame =
            typeof fontOptions.display === 'undefined' || fontOptions.display === fontFace.display;
          const isStyleSame =
            typeof fontOptions.style === 'undefined' || fontOptions.style === fontFace.style;
          const isWeightSame =
            typeof fontOptions.weight === 'undefined' || fontOptions.weight === fontFace.weight;
          const isFamilySame = fontOptions.name === fontFace.family;

          return isDisplaySame && isStyleSame && isWeightSame && isFamilySame;
        }),
    );
  }

  private getFontsOptionsFromCache(): FontsOptions {
    return Object.entries(this.scene.game.cache.binary.entries.entries)
      .map(([key, source]) => {
        const [type, name, weight, style, display] = key.split('_');
        if (type !== 'font') return null;
        return { name, weight, style, display, source };
      })
      .filter(Boolean) as FontsOptions;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
