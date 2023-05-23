export type FontStyle = 'italic' | 'normal';

export type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | 'normal';

export type FontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

export type FontOptions = {
  name: string;
  source: string | BinaryData;
  weight?: FontWeight;
  style?: FontStyle;
  display?: FontDisplay;
};

export type FontsOptions = FontOptions[];
