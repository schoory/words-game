// You can write more code here

/* START OF COMPILED CODE */

import Phaser from 'phaser';
import OnPointerEventScript from '../../script-nodes-basic/OnPointerEventScript';
import ScaleActionScript from '../../script-nodes/ScaleActionScript';
/* START-USER-IMPORTS */
import { addPromiseTween } from 'src/utils/addPromiseTween';
/* END-USER-IMPORTS */

export default class WordsSectionCongrat extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x ?? 640, y ?? 127.7890625);

    // CongratImage
    const congratImage = scene.add.image(0, 180, 'checkmark');
    this.add(congratImage);

    // CongratText
    const congratText = scene.add.text(0, 0, '', {});
    congratText.setOrigin(0.5, 0.5);
    congratText.text = 'Выполнено';
    congratText.setStyle({
      color: '#293671',
      fontFamily: 'Roboto',
      fontSize: '32px',
      fontStyle: 'bold',
    });
    this.add(congratText);

    // NextButton
    const nextButton = scene.add.image(0, 431.5, 'next');
    this.add(nextButton);

    // onPointerOver
    const onPointerOver = new OnPointerEventScript(nextButton);

    // scaleActionScript
    const scaleActionScript = new ScaleActionScript(onPointerOver);

    // onPointerOut
    const onPointerOut = new OnPointerEventScript(nextButton);

    // scaleActionScript_1
    const scaleActionScript_1 = new ScaleActionScript(onPointerOut);

    // onPointerDown
    const onPointerDown = new OnPointerEventScript(nextButton);

    // scaleActionScript_2
    const scaleActionScript_2 = new ScaleActionScript(onPointerDown);

    // onPointerOver (prefab fields)
    onPointerOver.eventName = 'pointerover';

    // scaleActionScript (prefab fields)
    scaleActionScript.scale = 1.1;

    // onPointerOut (prefab fields)
    onPointerOut.eventName = 'pointerout';

    // scaleActionScript_1 (prefab fields)
    scaleActionScript_1.scale = 1;

    // onPointerDown (prefab fields)
    onPointerDown.eventName = 'pointerdown';

    // scaleActionScript_2 (prefab fields)
    scaleActionScript_2.scale = 0.8;

    this.congratImage = congratImage;
    this.congratText = congratText;
    this.onPointerOver = onPointerOver;
    this.onPointerOut = onPointerOut;
    this.nextButton = nextButton;

    /* START-USER-CTR-CODE */
    nextButton.setInteractive({ useHandCursor: true });
    /* END-USER-CTR-CODE */
  }

  public congratImage: Phaser.GameObjects.Image;
  public congratText: Phaser.GameObjects.Text;
  public onPointerOver: OnPointerEventScript;
  public onPointerOut: OnPointerEventScript;
  public nextButton: Phaser.GameObjects.Image;
  public animDuration: number = 200;

  /* START-USER-CODE */

  public async show() {
    return addPromiseTween(this.scene, {
      targets: this,
      alpha: 1,
      duration: this.animDuration,
    });
  }

  public async hide() {
    return addPromiseTween(this.scene, {
      targets: this,
      alpha: 0,
      duration: this.animDuration,
    });
  }

  public waitNextButtonClick() {
    return new Promise<void>((resolve) => this.nextButton.once('pointerdown', resolve));
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
