// You can write more code here

/* START OF COMPILED CODE */

import OnMouseEventScript from './OnPointerEventScript';
import ScriptNode from './ScriptNode';
import Phaser from 'phaser';
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OnPointerDownScript extends OnMouseEventScript {
  constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
    super(parent);

    // this (prefab fields)
    this.eventName = 'pointerdown';

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
