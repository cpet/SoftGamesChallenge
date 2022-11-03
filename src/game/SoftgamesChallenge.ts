import { Application, Container, Graphics, Sprite, Point } from "pixi.js";
import MainScreen from "./screen/MainScreen";
import SpritesScreen from "./screen/SpritesScreen";
import TextAndSpriteToolScreen from "./screen/TextAndSpriteToolScreen";
import ParticlesScreen from "./screen/ParticlesScreen";

import PixiFps from "pixi-fps";
import { LOGICAL_GAME_SPACE } from "./GG";
import { MAIN_SCREEN_EVENT, MAIN_SCREEN_EVENT_REQUEST } from "./screen/MainScreen";

export default class SoftgamesChallenge {
    private _app: Application;
    private _gameWorld: Container;
    private _bgGraphics!: Graphics;
    private _gameIsRunning: boolean = false;


    private _mainScreen: MainScreen;
    private _spritesScreen: SpritesScreen | undefined;
    private _textAndSpriteScreen: TextAndSpriteToolScreen | undefined;
    private _particlesScreen: ParticlesScreen | undefined;

    private _currentScreen: Container | undefined;

    constructor(app: Application) {
        this._app = app;
        this._gameWorld = new Container();

        this._app.stage.addChild(this._gameWorld);

        // Logical space background color.
        // this._bgGraphics = new Graphics();
        // this._bgGraphics.beginFill(0xa9e8fd);
        // this._bgGraphics.drawRect(0, 0, LOGICAL_GAME_SPACE.width, LOGICAL_GAME_SPACE.height);
        // this._bgGraphics.endFill();
        // this._bgGraphics.cacheAsBitmap = true;
        // this._gameWorld.addChild(this._bgGraphics);

        // Add the game update to the PIXI app ticker.
        this._app.ticker.add((delta) => this.update(delta));

        const fps_counter = new PixiFps();
        this._app.stage.addChild(fps_counter);

        // Start the app by showing the main screen.
        this._mainScreen = new MainScreen();
        this._mainScreen.on(MAIN_SCREEN_EVENT.startScreen, this.startScreen, this);
        this._gameWorld.addChild(this._mainScreen);
    }

    startScreen(request: MAIN_SCREEN_EVENT_REQUEST) {
        switch (request) {
            case MAIN_SCREEN_EVENT_REQUEST.startSpritesScreen:
                this._spritesScreen = new SpritesScreen();
                this._spritesScreen.startGame();
                this._gameWorld.addChild(this._spritesScreen);
                break;

            case MAIN_SCREEN_EVENT_REQUEST.startToolScreen:
                this._textAndSpriteScreen = new TextAndSpriteToolScreen();
                this._textAndSpriteScreen.startGame();
                this._gameWorld.addChild(this._textAndSpriteScreen);
                break;

            case MAIN_SCREEN_EVENT_REQUEST.startParticlesScreen:
                this._particlesScreen = new ParticlesScreen();
                this._particlesScreen.startGame();
                this._gameWorld.addChild(this._particlesScreen);
                break;
        }
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

        this._gameWorld.x = 0;
        if (new_game_width < new_width) {
            this._gameWorld.x = (new_width - new_game_width) * 0.5;
        }

        this._gameWorld.y = 0;
        if (new_game_height < new_height) {
            this._gameWorld.y = (new_height - new_game_height) * 0.5;
        }


        this._spritesScreen?.resize(new_width, new_height);
        this._textAndSpriteScreen?.resize(new_width, new_height);
    }

    update(delta: number) {
        this._particlesScreen?.update(delta);
    }

    reset() { }
}