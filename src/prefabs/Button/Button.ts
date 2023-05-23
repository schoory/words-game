// You can write more code here

/* START OF COMPILED CODE */

import Phaser from 'phaser';
import OnPointerDownScript from '../../script-nodes-basic/OnPointerDownScript';
import ScaleActionScript from '../../script-nodes/ScaleActionScript';
import OnPointerEventScript from '../../script-nodes-basic/OnPointerEventScript';
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x ?? 680, y ?? 325);

    // buttonBackground
    const buttonBackground = scene.add.rectangle(0, 0, 288, 92);
    buttonBackground.name = 'buttonBackground';
    buttonBackground.isFilled = true;
    this.add(buttonBackground);

    // buttonText
    const buttonText = scene.add.text(0, 0, '', {});
    buttonText.name = 'buttonText';
    buttonText.setOrigin(0.5, 0.5);
    buttonText.text = 'Sample text';
    buttonText.setStyle({
      color: '#000000',
      fontFamily: 'Roboto',
      fontSize: '32px',
      fontStyle: 'bold',
    });
    this.add(buttonText);

    // onPointerDown
    const onPointerDown = new OnPointerDownScript(this);

    // onPress
    const onPress = new ScaleActionScript(onPointerDown);
    onPress.name = 'onPress';

    // onPointerOut
    const onPointerOut = new OnPointerEventScript(this);

    // scaleActionScript
    const scaleActionScript = new ScaleActionScript(onPointerOut);

    // onPointerOver
    const onPointerOver = new OnPointerEventScript(this);

    // scaleActionScript_1
    const scaleActionScript_1 = new ScaleActionScript(onPointerOver);

    // onPress (prefab fields)
    onPress.scale = 0.8;

    // onPointerOut (prefab fields)
    onPointerOut.eventName = 'pointerout';

    // scaleActionScript (prefab fields)
    scaleActionScript.scale = 1;

    // onPointerOver (prefab fields)
    onPointerOver.eventName = 'pointerover';

    // scaleActionScript_1 (prefab fields)
    scaleActionScript_1.scale = 1.1;

    this.buttonBackground = buttonBackground;
    this.buttonText = buttonText;
    this.onPress = onPress;
    this.onPointerDown = onPointerDown;

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  public buttonBackground: Phaser.GameObjects.Rectangle;
  public buttonText: Phaser.GameObjects.Text;
  public onPress: ScaleActionScript;
  public onPointerDown: OnPointerDownScript;

  /* START-USER-CODE */

  // Write your code here.

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
