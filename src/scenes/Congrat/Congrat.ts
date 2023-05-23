// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../../prefabs/Button/Button";
import SceneSwitchScript from "../../script-nodes/SceneSwitchScript";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Congrat extends Phaser.Scene {

	constructor() {
		super("Congrat");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// backgroundImage
		const backgroundImage = this.add.image(720, 410.5, "background-03");
		backgroundImage.scaleX = 1.0595278667395402;
		backgroundImage.scaleY = 1.0595278667395402;

		// text_1
		const text_1 = this.add.text(720, 241.1484375, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "МОЛОДЕЦ!";
		text_1.setStyle({ "color": "#293671", "fontFamily": "Roboto", "fontSize": "32px" });

		// button
		const button = new Button(this, 720, 384);
		this.add.existing(button);
		button.buttonText.text = "Начать сначала";

		// sceneSwitchScript
		const sceneSwitchScript = new SceneSwitchScript(button.onPress);

		// sceneSwitchScript (prefab fields)
		sceneSwitchScript.switchTo = "Level";

		this.backgroundImage = backgroundImage;

		this.events.emit("scene-awake");
	}

	private backgroundImage!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

  // Write your code here

  async create() {
    this.editorCreate();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
