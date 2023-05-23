import Phaser from 'phaser';
import preloadAssetPackUrl from '../static/assets/preload-asset-pack.json';
import Congrat from './scenes/Congrat/Congrat';
import Level from './scenes/Level/Level';
import Preload from './scenes/Preload/Preload';
import './index.scss';

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.pack('pack', preloadAssetPackUrl);
  }

  create() {
    this.scene.start('Preload');
  }
}

window.addEventListener('load', function () {
  const game = new Phaser.Game({
    canvas: this.document.querySelector('.game') as HTMLCanvasElement,
    type: Phaser.WEBGL,
    width: 1440,
    height: 821,
    backgroundColor: '#2f2f2f',
    scale: {
      mode: Phaser.Scale.ScaleModes.NONE,
      autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    },
    scene: [Boot, Preload, Level, Congrat],
  });

  game.scene.start('Boot');
});
