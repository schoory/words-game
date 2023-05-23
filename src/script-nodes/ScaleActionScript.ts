// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ScaleActionScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	public yoyo: boolean = false;
	public scale: number = 1;

	/* START-USER-CODE */
  public override execute(args?: any): void {
    this.scene.add.tween({
      targets: this.gameObject,
      scale: this.scale,
      duration: 80,
      yoyo: this.yoyo,
      ...(this.yoyo
        ? { onYoyo: () => this.executeChildren(args) }
        : { onComplete: () => this.executeChildren(args) }),
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
