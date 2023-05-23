import Plate from '../../prefabs/Plate/Plate';

export type LevelInitData = {
  title: string;
  description: string;
  backgroundImage: string;
};

export type WaitPlatesEventResult =
  | { type: 'exit' }
  | ({ plate: Plate } & ({ type: 'pointerover' } | { type: 'pointerdown' }));
