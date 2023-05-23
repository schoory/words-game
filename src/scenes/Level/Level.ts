// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import OnPointerEventScript from "../../script-nodes-basic/OnPointerEventScript";
import ScaleActionScript from "../../script-nodes/ScaleActionScript";
import SelectedWord from "../../prefabs/SelectedWord/SelectedWord";
import WordsSectionCongrat from "../../prefabs/WordsSectionCongrat/WordsSectionCongrat";
import DataLoadScript from "../../script-nodes/DataLoadScript/DataLoadScript";
/* START-USER-IMPORTS */
import { LevelDataWord } from '../../script-nodes/DataLoadScript/types';
import TaskWord from '../../prefabs/TaskWord/TaskWord';
import Plate from '../../prefabs/Plate/Plate';
import { WaitPlatesEventResult } from './types';
import { wait } from 'src/utils/wait';
import { addPromiseTween } from 'src/utils/addPromiseTween';
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
    /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// backgroundImage
		const backgroundImage = this.add.image(720, 410.5, "background-03");
		backgroundImage.scaleX = 1.0595278667395402;
		backgroundImage.scaleY = 1.0595278667395402;

		// backButton
		const backButton = this.add.image(39, 41, "back");
		backButton.name = "backButton";

		// onBackButtonPointerOut
		const onBackButtonPointerOut = new OnPointerEventScript(backButton);

		// scaleActionScript_5
		const scaleActionScript_5 = new ScaleActionScript(onBackButtonPointerOut);

		// onBackButtonPointerOver
		const onBackButtonPointerOver = new OnPointerEventScript(backButton);

		// scaleActionScript_4
		const scaleActionScript_4 = new ScaleActionScript(onBackButtonPointerOver);

		// onBackButtonPointerDown
		const onBackButtonPointerDown = new OnPointerEventScript(backButton);
		onBackButtonPointerDown.name = "onBackButtonPointerDown";

		// scaleActionScript_7
		const scaleActionScript_7 = new ScaleActionScript(onBackButtonPointerDown);

		// hintButton
		const hintButton = this.add.image(1401, 40.5, "help");
		hintButton.name = "hintButton";

		// onHintButtonPointerDown
		const onHintButtonPointerDown = new OnPointerEventScript(hintButton);
		onHintButtonPointerDown.name = "onHintButtonPointerDown";

		// scaleActionScript_6
		const scaleActionScript_6 = new ScaleActionScript(onHintButtonPointerDown);

		// onHintButtonPointerOver
		const onHintButtonPointerOver = new OnPointerEventScript(hintButton);

		// scaleActionScript_3
		const scaleActionScript_3 = new ScaleActionScript(onHintButtonPointerOver);

		// onHintButtonPointerOut
		const onHintButtonPointerOut = new OnPointerEventScript(hintButton);

		// scaleActionScript_2
		const scaleActionScript_2 = new ScaleActionScript(onHintButtonPointerOut);

		// titleText
		const titleText = this.add.text(720, 25.7177734375, "", {});
		titleText.setOrigin(0.5, 0.5);
		titleText.text = "Уровень 1";
		titleText.setStyle({ "color": "#000000", "fontFamily": "Roboto     ", "fontSize": "20px", "fontStyle": "bold" });

		// descriptionText
		const descriptionText = this.add.text(720, 45, "", {});
		descriptionText.setOrigin(0.5, 0);
		descriptionText.text = "Найди названия";
		descriptionText.setStyle({ "color": "#000000", "fontFamily": "Roboto     ", "fontSize": "24px", "fontStyle": "bold" });

		// answersContainer
		const answersContainer = this.add.container(720, 160);

		// answersBackground
		const answersBackground = this.add.rectangle(0, 0, 398, 130);
		answersBackground.isFilled = true;
		answersBackground.fillColor = 0;
		answersBackground.fillAlpha = 0.08;
		answersContainer.add(answersBackground);

		// taskText
		const taskText = this.add.text(720, 256, "", {});
		taskText.setOrigin(0.5, 0);
		taskText.text = "Выбери первую букву и веди\nкурсор над остальными";
		taskText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "Roboto     ", "fontSize": "24px", "fontStyle": "bold" });

		// plateContainer
		const plateContainer = this.add.container(752, 608);

		// plateContainerFiller
		const plateContainerFiller = this.add.rectangle(-32, 0, 400, 500);
		plateContainer.add(plateContainerFiller);

		// selectedWord
		const selectedWord = new SelectedWord(this, 720, 288);
		this.add.existing(selectedWord);

		// wordsSectionCongrat
		const wordsSectionCongrat = new WordsSectionCongrat(this, 720, 272);
		this.add.existing(wordsSectionCongrat);
		wordsSectionCongrat.alpha = 0;

		// dataLoadScript
		const dataLoadScript = new DataLoadScript(this);
		dataLoadScript.name = "dataLoadScript";

		// onBackButtonPointerOut (prefab fields)
		onBackButtonPointerOut.eventName = "pointerout";

		// scaleActionScript_5 (prefab fields)
		scaleActionScript_5.scale = 1;

		// onBackButtonPointerOver (prefab fields)
		onBackButtonPointerOver.eventName = "pointerover";

		// scaleActionScript_4 (prefab fields)
		scaleActionScript_4.scale = 1.1;

		// onBackButtonPointerDown (prefab fields)
		onBackButtonPointerDown.eventName = "pointerdown";

		// scaleActionScript_7 (prefab fields)
		scaleActionScript_7.yoyo = true;
		scaleActionScript_7.scale = 0.8;

		// onHintButtonPointerDown (prefab fields)
		onHintButtonPointerDown.eventName = "pointerdown";

		// scaleActionScript_6 (prefab fields)
		scaleActionScript_6.yoyo = true;
		scaleActionScript_6.scale = 0.8;

		// onHintButtonPointerOver (prefab fields)
		onHintButtonPointerOver.eventName = "pointerover";

		// scaleActionScript_3 (prefab fields)
		scaleActionScript_3.scale = 1.1;

		// onHintButtonPointerOut (prefab fields)
		onHintButtonPointerOut.eventName = "pointerout";

		// scaleActionScript_2 (prefab fields)
		scaleActionScript_2.scale = 1;

		// selectedWord (prefab fields)
		selectedWord.isShown = false;

		// dataLoadScript (prefab fields)
		dataLoadScript.levelData = "level-data";

		this.backgroundImage = backgroundImage;
		this.onBackButtonPointerDown = onBackButtonPointerDown;
		this.backButton = backButton;
		this.onHintButtonPointerDown = onHintButtonPointerDown;
		this.hintButton = hintButton;
		this.titleText = titleText;
		this.descriptionText = descriptionText;
		this.answersContainer = answersContainer;
		this.taskText = taskText;
		this.plateContainerFiller = plateContainerFiller;
		this.plateContainer = plateContainer;
		this.selectedWord = selectedWord;
		this.wordsSectionCongrat = wordsSectionCongrat;
		this.dataLoadScript = dataLoadScript;

		this.events.emit("scene-awake");
	}

	private backgroundImage!: Phaser.GameObjects.Image;
	private onBackButtonPointerDown!: OnPointerEventScript;
	private backButton!: Phaser.GameObjects.Image;
	private onHintButtonPointerDown!: OnPointerEventScript;
	private hintButton!: Phaser.GameObjects.Image;
	private titleText!: Phaser.GameObjects.Text;
	private descriptionText!: Phaser.GameObjects.Text;
	private answersContainer!: Phaser.GameObjects.Container;
	private taskText!: Phaser.GameObjects.Text;
	private plateContainerFiller!: Phaser.GameObjects.Rectangle;
	private plateContainer!: Phaser.GameObjects.Container;
	public selectedWord!: SelectedWord;
	private wordsSectionCongrat!: WordsSectionCongrat;
	private dataLoadScript!: DataLoadScript;

	/* START-USER-CODE */

  protected static ANSWERS_GAP = 20;

  protected static PLATES_GAP = 10;

  protected taskWords: TaskWord[] = [];

  protected plates: Plate[] = [];

  protected selectionData = {
    plates: [] as Plate[],
    isHintEnabled: false,
  };

  create() {
    this.editorCreate();

    this.events.once(Phaser.Scenes.Events.DESTROY, this.destroy.bind(this));
    this.hintButton.on('pointerdown', this.toggleHint.bind(this));

    this.playLevel();
  }

  destroy() {
    this.hintButton.off('pointerdown', this.toggleHint);
  }

  protected async playLevel() {
    if (!this.dataLoadScript.currentItem) return;

    while (!!this.dataLoadScript.currentItem) {
      await this.startWordsSection();

      await this.playPlates();

      await this.finishWordsSection();

      this.dataLoadScript.setCurrentItemIndex(this.dataLoadScript.currentItemIndex + 1);
    }

    this.scene.stop('Level');
    this.scene.start('Congrat');
  }

  protected clearDynamics() {
    this.plates.forEach((plate) => plate.destroy());
    this.taskWords.forEach((taskWord) => taskWord.destroy());
    this.taskWords = [];
    this.plates = [];
    this.selectedWord.setText('');
  }

  protected fillFromData() {
    const currentItem = this.dataLoadScript.currentItem;
    this.backgroundImage.setTexture(currentItem.backgroundImage);
    this.titleText.setText(currentItem.headerTitleText);
    this.descriptionText.setText(currentItem.headerDescriptionText);
    this.taskText.setText(currentItem.taskText);
    this.taskWords = this.fillWordsFromData(currentItem.words);
    this.answersContainer.add(this.taskWords);
    this.plates = this.fillPlatesFromData(currentItem.words);
    this.plateContainer.add(this.plates);
  }

  protected fillWordsFromData(words: LevelDataWord[]) {
    const taskWords = words.map(
      ({ word, image }) => new TaskWord(this, 0, 0, word.toUpperCase(), image),
    );

    const totalWidth = taskWords.reduce(
      (width, taskWord, index) =>
        width + taskWord.childrenWidth + (index !== 0 ? Level.ANSWERS_GAP : 0),
      0,
    );

    taskWords.forEach((taskWord, index) => {
      const positionX = taskWord.childrenWidth * index + Level.ANSWERS_GAP * index;
      const offsetFromCenter = positionX - totalWidth / 2 + taskWord.childrenWidth / 2;
      taskWord.setX(offsetFromCenter);
    });

    return taskWords;
  }

  protected fillPlatesFromData(words: LevelDataWord[]) {
    const flatCells = words.flatMap(({ cells }) => cells);
    const rowsCount = Math.max(...flatCells.map((cell) => cell.y)) + 1;
    const columnsCount = Math.max(...flatCells.map((cell) => cell.x)) + 1;
    const platesContainerOffsetX =
      (columnsCount * Plate.PLATE_SIZE + (columnsCount - 1) * Level.PLATES_GAP) / 2;
    const platesContainerOffsetY =
      (rowsCount * Plate.PLATE_SIZE + (rowsCount - 1) * Level.PLATES_GAP) / 2;

    return words.flatMap(({ word, image, cells }) =>
      cells.map((cell, index) => {
        const letter = word[index];

        const positionX =
          cell.x * Plate.PLATE_SIZE + cell.x * Level.PLATES_GAP - platesContainerOffsetX;
        const positionY =
          cell.y * Plate.PLATE_SIZE + cell.y * Level.PLATES_GAP - platesContainerOffsetY;

        const plate = new Plate(
          this,
          positionX,
          positionY,
          letter.toUpperCase(),
          cell,
        ).setInteractive();

        return plate;
      }),
    );
  }

  protected async toggleHint() {
    this.selectionData.isHintEnabled = !this.selectionData.isHintEnabled;

    return this.updateHintVisual();
  }

  protected async updateHintVisual() {
    if (!this.selectionData.isHintEnabled) return await this.enableAllPlates();
    if (this.selectionData.plates.length === 0) await this.enableAllPlates();
    else await this.disableIncorrectPlates();
  }

  protected async enableAllPlates() {
    return Promise.all(this.plates.map((plate) => plate.enable()));
  }

  protected async disableIncorrectPlates() {
    if (this.selectionData.plates.length === 0) return;

    const lastSelectedPlate = this.selectionData.plates[this.selectionData.plates.length - 1];
    const currentWord = this.getWordByPlate(lastSelectedPlate);
    if (!currentWord) return this.enableAllPlates();

    const nextCell =
      currentWord.cells[
        currentWord.cells.findIndex(
          (cell) => cell.x === lastSelectedPlate.cell.x && cell.y === lastSelectedPlate.cell.y,
        ) + 1
      ];
    if (!nextCell) return this.enableAllPlates();

    const nextPlate = this.getPlateByCell(nextCell);
    if (!nextPlate) return this.enableAllPlates();

    return Promise.all(
      this.plates.map((plate) => {
        if (this.selectionData.plates.includes(plate) || plate === nextPlate) plate.enable();
        else plate.disable();
      }),
    );
  }

  protected async playPlates() {
    while (!this.checkIfAllWordsResolved()) {
      this.updatePlatesView();

      await this.waitWordSearch();

      if (this.checkIfSelectedWordExists()) {
        await this.resolveSelectedPlates();
      } else {
        await this.displaySelectionError();
      }

      await this.clearAfterWordSearchIteration();
    }
  }

  protected async startWordsSection() {
    this.fillFromData();
    await this.showWordsSectionObjects();
  }

  protected async finishWordsSection() {
    await this.hidePlatesAreaObjects();
    this.wordsSectionCongrat.show();
    await this.wordsSectionCongrat.waitNextButtonClick();
    await Promise.all([await this.wordsSectionCongrat.hide(), this.hideWordsSectionObjects()]);
    this.clearDynamics();
  }

  protected async showWordsSectionObjects() {
    return Promise.all([
      addPromiseTween(this, {
        targets: [...this.taskWords, this.titleText, this.descriptionText, this.taskText],
        duration: 200,
        alpha: 1,
      }),
      this.showPlatesAreaObjects(),
    ]);
  }

  protected async hideWordsSectionObjects() {
    return Promise.all([
      addPromiseTween(this, {
        targets: [...this.taskWords, this.titleText, this.descriptionText, this.taskText],
        duration: 200,
        alpha: 0,
      }),
      this.hidePlatesAreaObjects(),
    ]);
  }

  protected async showPlatesAreaObjects() {
    return addPromiseTween(this, {
      targets: [this.plateContainer, this.taskText],
      duration: 200,
      alpha: 1,
    });
  }

  protected async hidePlatesAreaObjects() {
    return addPromiseTween(this, {
      targets: [this.plateContainer, this.taskText, this.selectedWord],
      duration: 200,
      alpha: 0,
    });
  }

  protected async waitWordSearch() {
    return new Promise<void>(async (resolve) => {
      while (!this.checkIfSelectedWordExists()) {
        const plateEvent = await this.waitPlatesEvent();

        if (plateEvent.type === 'pointerover') {
          await this.handlePointerOverPlate(plateEvent.plate);
        } else if (plateEvent.type === 'pointerdown' && this.selectionData.plates.length === 0) {
          await this.handlePointerPressPlate(plateEvent.plate);
        } else break;

        this.updatePlatesView();
      }

      resolve();
    });
  }

  protected async waitPlatesEvent() {
    const resolveEvent = (
      callback: (value: WaitPlatesEventResult) => void,
      value: WaitPlatesEventResult,
    ) => callback(value);

    const result = await Promise.race<WaitPlatesEventResult>([
      ...this.plates.map(
        (plate) =>
          new Promise<WaitPlatesEventResult>((resolve) => {
            plate
              .on('pointerover', resolveEvent.bind(this, resolve, { type: 'pointerover', plate }))
              .on('pointerdown', resolveEvent.bind(this, resolve, { type: 'pointerdown', plate }));
          }),
      ),
    ]);

    this.plates.forEach((plate) =>
      plate.off('pointerover', resolveEvent).off('pointerdown', resolveEvent),
    );

    return result;
  }

  protected async handlePointerOverPlate(plate: Plate) {
    if (plate.plateState === 'resolved') return;

    if (this.selectionData.plates.length === 0) return;

    if (this.selectionData.plates.includes(plate)) {
      return await this.trimPlateSelection(0, plate);
    }

    const lastSelectedPlate = this.selectionData.plates[this.selectionData.plates.length - 1];
    const nearestPlates = this.getNearestPlates(lastSelectedPlate);

    if (nearestPlates.includes(plate)) await this.addPlateToSelection(plate);
  }

  protected async handlePointerPressPlate(plate: Plate) {
    if (plate.plateState === 'resolved') return;

    await this.addPlateToSelection(plate);
  }

  protected async resolveSelectedPlates() {
    await Promise.all([
      ...this.selectionData.plates.map((plate) => plate.setPlateState('resolved')),
      this.selectedWord.resolve(),
    ]);
    await wait(500);
    const taskWord = this.taskWords.find((taskWord) => taskWord.text === this.selectedWord.text)!;
    await Promise.all([
      this.selectionData.plates.map((plate) => plate.hide()),
      this.selectedWord.translateToObject(taskWord),
      this.selectedWord.hide(),
      taskWord.switchDisplay(),
    ]);
    this.selectedWord.unresolve();
  }

  protected async displaySelectionError() {
    await Promise.all([
      ...this.selectionData.plates.map((plate) => plate.setError(true)),
      this.selectedWord.setError(true),
    ]);
    await wait(500);
    await Promise.all([
      ...this.selectionData.plates.map((plate) => plate.setError(false)),
      this.selectedWord.setError(false),
    ]);
  }

  protected async updatePlatesView() {
    return Promise.all([
      this.updateHintVisual(),
      ...this.plates.map(
        (plate) =>
          plate.plateState !== 'resolved' &&
          plate.setPlateState(this.selectionData.plates.includes(plate) ? 'pressed' : 'unset'),
      ),
    ]);
  }

  protected async addPlateToSelection(plate: Plate) {
    if (this.selectionData.plates.includes(plate) || plate.isDisabled) return;

    this.selectionData.plates.push(plate);
    this.updateSelectedWordText();
  }

  protected async trimPlateSelection(startIndex: number, cutToPlate: Plate) {
    this.selectionData.plates = this.selectionData.plates.slice(
      startIndex,
      this.selectionData.plates.indexOf(cutToPlate) + 1,
    );

    this.updateSelectedWordText();
  }

  protected checkIfAllWordsResolved() {
    return this.dataLoadScript.currentItem.words.every((word) =>
      word.cells.every((cell) => this.getPlateByCell(cell)?.plateState === 'resolved'),
    );
  }

  protected checkIfSelectedWordExists() {
    if (this.selectionData.plates.length === 0) return false;

    return this.dataLoadScript.currentItem.words.some(
      ({ cells }) =>
        this.selectionData.plates.length === cells.length &&
        cells.every(
          (cell) =>
            !!this.selectionData.plates.find(
              (plate) => plate.cell.x === cell.x && plate.cell.y === cell.y,
            ),
        ),
    );
  }

  protected getPlateByCell(cell: { x: number; y: number }) {
    return this.plates.find((plate) => plate.cell.x === cell.x && plate.cell.y === cell.y);
  }

  protected getWordByPlate(plate: Plate) {
    return this.dataLoadScript.currentItem.words.find((word) =>
      word.cells.some((cell) => cell.x === plate.cell.x && cell.y === plate.cell.y),
    );
  }

  protected getNearestPlates(plate: Plate) {
    return [
      this.plates.find((p) => p.cell.x === plate.cell.x + 1 && p.cell.y === plate.cell.y),
      this.plates.find((p) => p.cell.x === plate.cell.x - 1 && p.cell.y === plate.cell.y),
      this.plates.find((p) => p.cell.x === plate.cell.x && p.cell.y === plate.cell.y + 1),
      this.plates.find((p) => p.cell.x === plate.cell.x && p.cell.y === plate.cell.y - 1),
    ].filter((plate) => plate !== null && plate !== undefined);
  }

  protected async updateSelectedWordText() {
    const isShown = this.selectionData.plates.length !== 0;
    const text = this.selectionData.plates.map((plate) => plate.plateLetter.text).join('');
    const shouldChangeAlpha =
      (isShown && !this.selectedWord.isShown) || (!isShown && this.selectedWord.isShown);

    if (isShown) {
      this.selectedWord.setText(text);
      if (shouldChangeAlpha) await this.toggleSelectedWord(true);
    } else {
      if (shouldChangeAlpha) await this.toggleSelectedWord(false);
      this.selectedWord.setText(text);
    }
  }

  protected async toggleSelectedWord(isShown: boolean) {
    if (isShown) {
      await addPromiseTween(this, { targets: this.taskText, duration: 200, alpha: 0 });
      await this.selectedWord.show();
    } else {
      await this.selectedWord.hide();
      await addPromiseTween(this, { targets: this.taskText, duration: 200, alpha: 1 });
    }
  }

  protected async clearAfterWordSearchIteration() {
    this.selectionData.plates = [];
    await this.updateSelectedWordText();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
