import Phaser from 'phaser';
import { addPromiseTween } from 'src/utils/addPromiseTween';

export default class TaskWord extends Phaser.GameObjects.Container {
  protected static GAME_OBJECTS_GAP = 10.5;

  protected static CELLS_GAP = 2;

  protected static CELLS_SIZE = 20;

  constructor(scene: Phaser.Scene, x?: number, y?: number, word?: string, image?: string) {
    super(scene, x ?? 0, y ?? 0);

    this.word = word ?? '';
    this.image = image ?? '';

    this.taskWordImage = scene.add.image(0, 0, this.image);
    this.taskWordText = scene.add.text(0, 0, this.word);
    this.taskWordCells = this.createCells();
    this.taskWordCellsContainer = scene.add.container(0, 0, this.taskWordCells);

    this.setWordImageDefaults();
    this.setWordTextDefaults();
    this.setWordCellsDefaults();

    this.setGameObjectsPosition();

    this.add(this.taskWordImage).add(this.taskWordCellsContainer).add(this.taskWordText);
  }

  public word: string = '';

  public image: string = '';

  public animDuration: number = 200;

  protected taskWordImage!: Phaser.GameObjects.Image;

  protected taskWordText!: Phaser.GameObjects.Text;

  protected taskWordCellsContainer!: Phaser.GameObjects.Container;

  protected taskWordCells!: Phaser.GameObjects.Rectangle[];

  protected isTextShown: boolean = false;

  public get text() {
    return this.taskWordText.text;
  }

  public get childrenWidth() {
    return Math.max(
      this.taskWordImage.width,
      this.taskWordCells.reduce(
        (width, cell, index) => width + cell.width + (index !== 0 ? TaskWord.CELLS_GAP : 0),
        0,
      ),
    );
  }

  public get childrenHeight() {
    return this.taskWordImage.height + TaskWord.GAME_OBJECTS_GAP + this.taskWordText.height;
  }

  public async switchDisplay() {
    if (!this.isTextShown) {
      this.isTextShown = true;
      await this.hideCells();
      await this.showText();
    } else {
      this.isTextShown = false;
      await this.hideText();
      await this.showCells();
    }
  }

  public async showCells() {
    return this.createAlphaTween(this.taskWordCellsContainer, 1);
  }

  public async hideCells() {
    return this.createAlphaTween(this.taskWordCellsContainer, 0);
  }

  public async showText() {
    return this.createAlphaTween(this.taskWordText, 1);
  }

  public async hideText() {
    return this.createAlphaTween(this.taskWordText, 0);
  }

  protected async createAlphaTween(target: Phaser.GameObjects.GameObject, alpha: number) {
    return addPromiseTween(this.scene, {
      targets: target,
      alpha: alpha,
      duration: this.animDuration,
    });
  }

  protected createCells() {
    return this.word.split('').map(() => {
      const cell = this.scene.add.rectangle(0, 0, TaskWord.CELLS_SIZE, TaskWord.CELLS_SIZE);
      return cell;
    });
  }

  protected setWordTextDefaults() {
    this.taskWordText
      .setOrigin(0.5, 0.5)
      .setStyle({
        color: '#000000',
        fontFamily: 'Roboto',
        fontSize: '24px',
        fontStyle: 'bold',
      })
      .setAlpha(0);
  }

  protected setWordImageDefaults() {
    this.taskWordImage.setOrigin(0.5, 0.5);
  }

  protected setWordCellsDefaults() {
    this.taskWordCells.forEach((cell) => (cell.isFilled = true));
  }

  protected setGameObjectsPosition() {
    const totalHeight = this.taskWordImage.height + TaskWord.GAME_OBJECTS_GAP + 20;
    const halfTotalHeight = totalHeight / 2;

    this.taskWordImage.setY(this.taskWordImage.height / 2 - halfTotalHeight);

    const totalCellsWidth =
      this.taskWordCells.length * (TaskWord.CELLS_SIZE + TaskWord.CELLS_GAP) - TaskWord.CELLS_GAP;
    const halfCellSize = TaskWord.CELLS_SIZE / 2;

    this.taskWordCells.forEach((cell, index) => {
      const positionX = TaskWord.CELLS_SIZE * index + TaskWord.CELLS_GAP * index;
      const offsetFromCenter = positionX - totalCellsWidth / 2 + halfCellSize;
      cell.setX(offsetFromCenter);
    });

    const taskWordImagePositionBottom =
      this.taskWordImage.x + this.taskWordImage.height - halfTotalHeight;

    this.taskWordCellsContainer.setY(
      taskWordImagePositionBottom + TaskWord.GAME_OBJECTS_GAP + halfCellSize,
    );

    this.taskWordText.setY(
      taskWordImagePositionBottom + TaskWord.GAME_OBJECTS_GAP + this.taskWordText.height / 2,
    );
  }
}
