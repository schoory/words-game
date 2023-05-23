// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from '../script-nodes-basic/ScriptNode';
import Phaser from 'phaser';
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SceneSwitchScript extends ScriptNode {
  constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
    super(parent);

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  public switchTo: string = 'Level';

  /* START-USER-CODE */

  /**
   *
   * @param from
   * @param to
   */
  override execute(..._args: any): void {
    super.execute();
    this.scenePlugin.switch(this.switchTo);
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
