// You can write more code here

/* START OF COMPILED CODE */

import Phaser from 'phaser';
import ScriptNode from './ScriptNode';
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SpriteScriptNode extends ScriptNode {
  constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
    super(parent);

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */

  get gameObject() {
    return super.gameObject as Phaser.GameObjects.Sprite;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
