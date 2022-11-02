import { Container, Point, Sprite, BitmapText, IBitmapTextStyle } from "pixi.js";
import { gsap } from "gsap";

export default class TextAndSprite extends Container {

    static MAX_FONT_SIZE = 64;

    constructor(x?: number, y?: number) {
        super();

        this.x = x || 0;
        this.y = y || 0;
    }

    addText(str: string, opts?: TextSpriteOpts): BitmapText {
        let style = opts?.bitmapTextStyle || { fontName: "ETH_B_gofa", fontSize: 32 };
        let bt = new BitmapText(str, style);
        bt.visible = true;
        bt.interactive = false;
        bt.anchor.x = bt.anchor.y = 0;

        if (opts) {
            this._applyOpts(bt, opts);
        }

        this.addChild(bt);
        return bt;
    }

    addSprite(spr: Sprite, opts?: TextSpriteOpts): Sprite {
        spr.visible = true;
        spr.interactive = false;

        if (opts) {
            this._applyOpts(spr, opts);
        }

        this.addChild(spr);
        return spr;
    }

    private _applyOpts(elem: Sprite | BitmapText, opts: TextSpriteOpts) {
        elem.x = opts?.x || 0;
        elem.y = opts?.y || 0;

        if (this.children.length > 0) {
            const prev = this.children[this.children.length - 1] as Sprite | BitmapText;

            if (opts.vAlignToPrev) {
                switch (opts.vAlignToPrev) {
                    case V_ALIGN.LEFT:
                        elem.x = prev.x;
                        break;
                    case V_ALIGN.RIGHT:
                        let max_x = Math.max(elem.x + elem.width, prev.x + prev.width);
                        elem.x = max_x - elem.width;
                        prev.x = max_x - prev.width;
                    case V_ALIGN.CENTER:
                        elem.x = Math.floor(prev.x + (prev.width - elem.width) * 0.5);
                }
            }

            if (opts.hAlignToPrev) {
                switch (opts.hAlignToPrev) {
                    case H_ALIGN.TOP:
                        elem.y = prev.y;
                        break;
                    case H_ALIGN.BOTTOM:
                        let max_y = Math.max(elem.y + elem.height, prev.x + prev.height);
                        elem.y = max_y - elem.height;
                        prev.y = max_y - prev.height;
                    case H_ALIGN.CENTER:
                        elem.y = Math.floor(prev.y + (prev.height - elem.height) * 0.5);
                }
            }
        }
    }

    startPopAnim(x: number, y: number, dist_y: number) {
        this.alpha = 1;
        this.visible = true;
        this.interactive = false;
        // this.cacheAsBitmap = true;
        this.x = x;
        this.y = y;

        gsap.to(this, {
            duration: 1,
            y: y + dist_y,
            onComplete: () => {
                gsap.to(this, {
                    delay: 2,
                    duration: 0.25,
                    y: y - dist_y,
                    alpha: 0.1,
                    onComplete: () => {
                        this.visible = false;
                        this.alpha = 1;
                        // this.cacheAsBitmap = false;
                    }
                });
            },
        });
    }
}

export interface TextSpriteOpts {
    bitmapTextStyle?: Partial<IBitmapTextStyle>,
    x?: number,
    y?: number,
    vAlignToPrev?: V_ALIGN,
    hAlignToPrev?: H_ALIGN,
}

export enum V_ALIGN {
    LEFT = "left",
    RIGHT = "right",
    CENTER = "center"
}

export enum H_ALIGN {
    TOP = "top",
    BOTTOM = "bottom",
    CENTER = "center"
}