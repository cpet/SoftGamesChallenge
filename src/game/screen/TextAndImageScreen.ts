import { Container, Point, Sprite, BitmapText, Texture } from "pixi.js";
import Util from "../../Util";
import TextAndSprite, { H_ALIGN, V_ALIGN } from "../tool/TextAndSprite";
// import { LOGICAL_GAME_SPACE } from "../SoftgamesChallenge";
// import { gsap } from "gsap";

export default class SpritesScreen extends Container {
    constructor() {
        super();

        this.startGame();
    }

    startGame() {

        let tas1 = new TextAndSprite(400, 300);

        let font_size: number = Util.getRandomIntInclusive(24, 64);

        let spr = Sprite.from('PlayerShip_B8');
        spr.height = font_size;
        spr.scale.x = spr.scale.y;

        tas1.addSprite(spr);

        let bt1 = tas1.addText("PRELOADED FOX", {
            x: spr.width + 10,
            y: spr.y,
            bitmapTextStyle: { fontName: "ETH_B_gofa", fontSize: font_size }
        });

        tas1.addText("JUMPS OVER THE\nLAZY LOADED DOG", {
            y: bt1.y + bt1.height + 8,
            bitmapTextStyle: { fontName: "ETH_B_gofa", fontSize: font_size, align: "left" }
        });
        this.addChild(tas1);

        // tas1.startPopAnim(400, 800, -100);

    }

    pickRandomConfiguration() {
        let font_size: number = Util.getRandomIntInclusive(24, 64);

        if (Util.chance(0.5)) {
            let spr = Sprite.from('PlayerShip_B8');
            spr.height = font_size;
            spr.scale.x = spr.scale.y;
        }

        
    }

    resize(new_width: number, new_height: number) {
        // Portrait vs Landscape arrangements can be done here.
    }
}