import { Application, Container, Graphics, Sprite, Point } from "pixi.js";
import SpritesScreen from "./screen/SpritesScreen";
import TextAndSpriteScreen from "./screen/TextAndImageScreen";
import PixiFps from "pixi-fps";

export default class SoftgamesChallenge {
    private _app: Application;
    private _gameWorld: Container;
    private _bgGraphics!: Graphics;
    private _gameIsRunning: boolean = false;

    private _spritesScreen: SpritesScreen;
    private _textAndSpriteScreen: TextAndSpriteScreen;


    constructor(app: Application) {
        this._app = app;
        this._gameWorld = new Container();

        this._app.stage.addChild(this._gameWorld);

        // Logical space background color.
        this._bgGraphics = new Graphics();
        this._bgGraphics.beginFill(0xa9e8fd);
        this._bgGraphics.drawRect(0, 0, LOGICAL_GAME_SPACE.width, LOGICAL_GAME_SPACE.height);
        this._bgGraphics.endFill();
        this._bgGraphics.cacheAsBitmap = true;
        this._gameWorld.addChild(this._bgGraphics);

        // 
        this._spritesScreen = new SpritesScreen();
        this._textAndSpriteScreen = new TextAndSpriteScreen();

        // this._gameWorld.addChild(this._spritesScreen);
        this._gameWorld.addChild(this._textAndSpriteScreen);


        // Add the game update to the PIXI app ticker.
        this._app.ticker.add((delta) => this.update(delta));

        const fps_counter = new PixiFps();
        this._app.stage.addChild(fps_counter);
    }

    /**
     * Fit the logical game space into the new width and height.
     * The fitting strategy is to fit the game by desired height then center the game world into the available space.
     * @param new_width
     * @param new_height
     */
    resize(new_width: number, new_height: number) {
        this._app.renderer.resize(new_width, new_height);

        const scale_x: number = new_width / LOGICAL_GAME_SPACE.width;
        const scale_y: number = new_height / LOGICAL_GAME_SPACE.height;
        const scale = Math.min(scale_x, scale_y);

        this._gameWorld.scale.x = this._gameWorld.scale.y = scale;
        const new_game_width = LOGICAL_GAME_SPACE.width * scale;
        const new_game_height = LOGICAL_GAME_SPACE.height * scale;

        if (new_game_width < new_width) {
            this._gameWorld.x = (new_width - new_game_width) * 0.5;
        }
        
        if (new_game_height < new_height) {
            this._gameWorld.y = (new_height - new_game_height) * 0.5;
        }
        

        this._spritesScreen.resize(new_width, new_height);
        this._textAndSpriteScreen.resize(new_width, new_height);
    }

    update(delta: number) { }

    reset() { }
}

export const LOGICAL_GAME_SPACE = {
    width: 768,
    height: 1024,
    halfWidth: 768 / 2,
    halfHeight: 1024 / 2,
};