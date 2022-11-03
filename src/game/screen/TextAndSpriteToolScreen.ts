import { Container } from "pixi.js";
import Util from "../../Util";
import { TextAndSprite } from "../tool/TextAndSprite";
import { TAS_ALIGN, LOGICAL_GAME_SPACE } from "../GG";
import { gsap } from "gsap";

export default class TextAndSpriteToolScreen extends Container {

    words = ["WORD1", "WORD2", "WORD3", "TEXT1", "TEXT2", "TEXT3", "MORE TEXT", "EXTRA WORDS", "SIMPLE WORDS"];
    imageTextureIds = [">>PlayerShip_B8", ">>PlayerShip_A7"];
    tasAligns = [
        TAS_ALIGN.horizontalCenter, TAS_ALIGN.horizontalTop, TAS_ALIGN.horizontalBottom,
        TAS_ALIGN.verticalCenter, TAS_ALIGN.verticalLeft, TAS_ALIGN.verticalRight
    ];

    tween: gsap.core.Tween | undefined;

    _interval: any;

    constructor() {
        super();
    }

    startGame() {
        this.startRandomTAS_Popup();
    }

    pickWordOrSprite(): string {
        let rand_ix: number = -1;
        // Toll a 50/50 for sprite id or text.
        if (Util.chance(0.5)) {
            rand_ix = Util.getRandomIntInclusive(0, this.imageTextureIds.length - 1);
            return this.imageTextureIds[rand_ix];
        }

        rand_ix = Util.getRandomIntInclusive(0, this.words.length - 1);
        return this.words[rand_ix];
    }

    startRandomTAS_Popup() {

        let rand_font_size = Util.getRandomIntInclusive(32, 64);
        let rand_margin = Util.getRandomIntInclusive(8, 16);
        let rand_align = this.tasAligns[Util.getRandomIntInclusive(0, this.tasAligns.length - 1)];


        let tas = TextAndSprite.CreateTAS(
            [this.pickWordOrSprite(), this.pickWordOrSprite(), this.pickWordOrSprite()],
            {
                bitmapTextStyle: { fontName: "ETH_B_gofa", fontSize: rand_font_size },
                align: rand_align, margin: rand_margin
            }
        );

        if (rand_align.startsWith('vertical')) {
            tas.startPopAnim(LOGICAL_GAME_SPACE.halfWidth, LOGICAL_GAME_SPACE.halfHeight, -200);
        }
        else {
            tas.startPopAnim(0, LOGICAL_GAME_SPACE.halfHeight, -200);
        }

        // this.cont.addChild(tas);
        this.addChild(tas);

        this.tween = gsap.delayedCall(2, this.startRandomTAS_Popup.bind(this));
    }

    resize(new_width: number, new_height: number) {
        // Portrait vs Landscape arrangements can be done here.
    }

    killTweens() {
        this.tween?.kill();
        gsap.killTweensOf(this);
    }
}