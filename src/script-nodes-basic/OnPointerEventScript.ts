// You can write more code here

/* START OF COMPILED CODE */

import OnEventScript from './OnEventScript';
import ScriptNode from './ScriptNode';
import Phaser from 'phaser';
/* START-USER-IMPORTS */
import { setContainerInteractive } from 'src/utils/setContainerInteractive';
/* END-USER-IMPORTS */

export default class OnPointerEventScript extends OnEventScript {
  constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
    super(parent);

    // this (prefab fields)
    this.eventName = 'pointerdown';

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  public cursor: string = 'pointer';

  /* START-USER-CODE */

  override awake(): void {
    if (!this.gameObject) {
      return;
    }

    if (!this.gameObject.input) {
      if (this.gameObject.type === 'Container') {
        setContainerInteractive({
          targetContainer: this.gameObject as Phaser.GameObjects.Container,
          options: { cursor: this.cursor },
        });
      } else this.gameObject.setInteractive({ cursor: this.cursor });
    }

    super.awake();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
