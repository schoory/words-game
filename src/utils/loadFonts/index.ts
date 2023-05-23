import { FontsOptions } from './types';

export const loadFonts = (fontsOptions: FontsOptions) =>
  Promise.all(
    fontsOptions.map((fontOptions) => {
      const font = new FontFace(fontOptions.name, fontOptions.source, {
        weight: fontOptions.weight,
        style: fontOptions.style,
        display: fontOptions.display,
      });
      return font.load();
    }),
  )
    .then((loadedFonts) => loadedFonts.map((loadedFont) => document.fonts.add(loadedFont)))
    .catch((error) => {
      throw error;
    });
