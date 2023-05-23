// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from '../../script-nodes-basic/ScriptNode';
import Phaser from 'phaser';
/* START-USER-IMPORTS */
import { LevelData } from './types';
/* END-USER-IMPORTS */

export default class DataLoadScript extends ScriptNode {
  constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
    super(parent);

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  public levelData: string = '';

  /* START-USER-CODE */

  public data: LevelData = { items: [] };

  private readonly assetKey = 'level-data';

  private itemIndex = 0;

  public get currentItemIndex() {
    return this.itemIndex;
  }

  public get currentItem() {
    return this.data.items[this.itemIndex];
  }

  public setCurrentItemIndex(itemIndex: number) {
    this.itemIndex = itemIndex;
  }

  public hasNextItem() {
    return this.itemIndex + 1 < this.data.items.length;
  }

  protected awake(): void {
    this.data = this.scene.cache.json.get(this.assetKey);

    if (!this.data) {
      this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
        this.data = this.scene.cache.json.get(this.assetKey);
      });
      this.scene.load.json(this.assetKey, this.levelData);
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
