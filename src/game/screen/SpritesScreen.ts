import { Container, Point, Sprite } from "pixi.js";
import { LOGICAL_GAME_SPACE } from "../SoftgamesChallenge";
import { gsap } from "gsap";

export default class SpritesScreen extends Container {
    private _sprites: Sprite[];

    private _leftStackPos: Point;
    private _rightStackPos: Point;

    private _leftStackCount: number = 0;
    private _rightStackCount: number = 0;

    private _yDiff: number = 10;

    constructor() {
        super();

        this._leftStackPos = new Point(Math.floor(LOGICAL_GAME_SPACE.width * 0.3 - 64), Math.floor(LOGICAL_GAME_SPACE.height * 0.1 - 64 - 32));
        this._rightStackPos = new Point(Math.floor(LOGICAL_GAME_SPACE.width * 0.7 - 64), Math.floor(LOGICAL_GAME_SPACE.height * 0.1 - 64 - 32));
        this._yDiff = Math.ceil((LOGICAL_GAME_SPACE.height) * 0.8 / 144);

        this._sprites = new Array<Sprite>(144);
        for (let i = 144; i >= 0; i--) {
            this._sprites[i] = Sprite.from('PlayerShip_A7');
            const spr = this._sprites[i];
            spr.x = this._leftStackPos.x;
            spr.y = this._leftStackPos.y + this._yDiff * i;

            this.addChild(spr);
        }
        this._leftStackCount = 144;

        this.startGame();
    }

    startGame() {

        for (let i = 0; i < this._sprites.length; i++) {
            const element = this._sprites[i];

            let target_x = this._rightStackPos.x;
            let target_y = this._rightStackPos.y + ((144 - i) * this._yDiff);

            gsap.to(this._sprites[i], {
                delay: 1 * i,
                duration: 2,
                x: (target_x),
                y: (target_y),
                ease: "none",
                onStart: () => {
                    // Bring the sprite on top.
                    this.addChild(this._sprites[i]);
                }
            });
        }

    }

    resize(new_width: number, new_height: number) {
        // Portrait vs Landscape arrangements can be done here.
    }
}