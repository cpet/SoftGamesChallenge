import { BitmapText, Container } from "pixi.js";
import { LOGICAL_GAME_SPACE } from "../GG";

export default class MainScreen extends Container {

    private _spritesScreenBtn: BitmapText;
    private _toolScreenBtn: BitmapText;
    private _particlesScreenBtn: BitmapText;

    private _instructionsBT: BitmapText;

    constructor() {
        super();

        // 1. Sprites.
        this._spritesScreenBtn = new BitmapText("1. SPRITES", { fontName: "ETH_B_gofa", fontSize: 64 });
        this._spritesScreenBtn.interactive = true;
        this._spritesScreenBtn.on('pointerdown', () => {
            this.startScreen(MAIN_SCREEN_EVENT_REQUEST.startSpritesScreen);
        });

        this._spritesScreenBtn.x = LOGICAL_GAME_SPACE.width * 0.2;
        this._spritesScreenBtn.y = LOGICAL_GAME_SPACE.height * 0.2;
        this.addChild(this._spritesScreenBtn);

        // 2. Text and Sprites Tool.
        this._toolScreenBtn = new BitmapText("2. TEXT AND\nSPRITES TOOL", { fontName: "ETH_B_gofa", fontSize: 64 });
        this._toolScreenBtn.interactive = true;
        this._toolScreenBtn.on('pointerdown', () => {
            this.startScreen(MAIN_SCREEN_EVENT_REQUEST.startToolScreen);
        });

        this._toolScreenBtn.x = LOGICAL_GAME_SPACE.width * 0.2;
        this._toolScreenBtn.y = LOGICAL_GAME_SPACE.height * 0.3;
        this.addChild(this._toolScreenBtn);

        // 3. Particles.
        this._particlesScreenBtn = new BitmapText("3. PARTICLES", { fontName: "ETH_B_gofa", fontSize: 64 });
        this._particlesScreenBtn.interactive = true;
        this._particlesScreenBtn.on('pointerdown', () => {
            this.startScreen(MAIN_SCREEN_EVENT_REQUEST.startParticlesScreen);
        });

        this._particlesScreenBtn.x = LOGICAL_GAME_SPACE.width * 0.2;
        this._particlesScreenBtn.y = LOGICAL_GAME_SPACE.height * 0.45;
        this.addChild(this._particlesScreenBtn);

        // Instructions Bitmap Text.
        this._instructionsBT = new BitmapText("TAP ON EITHER TEST (1. 2. 3.)\nTO RUN IN FULL SCREEN MODE\nREFRESH THE PAGE TO\nPICK OTHER OPTIONS ", { fontName: "ETH_B_gofa", fontSize: 48, align: "center" });
        this._instructionsBT.tint = 0xff3399;
        this._instructionsBT.anchor.x = 0.5;
        this._instructionsBT.x = LOGICAL_GAME_SPACE.halfWidth;
        this._instructionsBT.y = LOGICAL_GAME_SPACE.height * 0.6;
        this.addChild(this._instructionsBT)

    }

    startScreen(request: MAIN_SCREEN_EVENT_REQUEST) {
        this.emit(MAIN_SCREEN_EVENT.startScreen, request);
        this.clear();
        this.startFullScreen();
    }

    getFullScreenElement() {
        return document.fullscreenElement;
    }

    startFullScreen() {
        document.documentElement.requestFullscreen()
            .catch((err) => {
                console.error(err);
            });
    }

    clear() {
        if (this.parent) {
            this.parent.removeChild(this);
        }

        this.destroy({ children: true });
    }
}

export enum MAIN_SCREEN_EVENT_REQUEST {
    startSpritesScreen = "startSpritesScreenRequest",
    startToolScreen = "startToolScreenRequest",
    startParticlesScreen = "startParticlesScreenRequest"
}

export enum MAIN_SCREEN_EVENT {
    startScreen = "startscreen"
}