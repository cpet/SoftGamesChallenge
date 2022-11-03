import { Container, Sprite, BitmapText, IBitmapTextStyle } from "pixi.js";
import { TAS_ALIGN } from "../GG";
import { gsap } from "gsap";

export class TextAndSprite extends Container {

    static MAX_FONT_SIZE = 64;
    static DEFAULT_FONT_SIZE = 32;

    constructor(x?: number, y?: number) {
        super();

        this.x = x || 0;
        this.y = y || 0;
    }

    addText(str: string, opts?: TextOpts): BitmapText {
        let style = opts?.bitmapTextStyle || { fontName: "ETH_B_gofa", fontSize: TextAndSprite.DEFAULT_FONT_SIZE };
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

    addSprite(src: string): Sprite {
        let spr = Sprite.from(src);
        spr.visible = true;
        spr.interactive = false;

        this.addChild(spr);
        return spr;
    }

    private _applyOpts(elem: Sprite | BitmapText, opts: TextOpts) {
        elem.x = opts?.x || 0;
        elem.y = opts?.y || 0;

        //// Feels like overkill at this point, but it could be done to have special text and image arrangements possible.
        // if (this.children.length > 0) {
        //     const prev = this.children[this.children.length - 1] as Sprite | BitmapText;

        //     if (opts.vAlignToPrev) {
        //         switch (opts.vAlignToPrev) {
        //             case V_ALIGN.LEFT:
        //                 elem.x = prev.x;
        //                 break;
        //             case V_ALIGN.RIGHT:
        //                 let max_x = Math.max(elem.x + elem.width, prev.x + prev.width);
        //                 elem.x = max_x - elem.width;
        //                 prev.x = max_x - prev.width;
        //             case V_ALIGN.CENTER:
        //                 elem.x = Math.floor(prev.x + (prev.width - elem.width) * 0.5);
        //         }
        //     }

        //     if (opts.hAlignToPrev) {
        //         switch (opts.hAlignToPrev) {
        //             case H_ALIGN.TOP:
        //                 elem.y = prev.y;
        //                 break;
        //             case H_ALIGN.BOTTOM:
        //                 let max_y = Math.max(elem.y + elem.height, prev.x + prev.height);
        //                 elem.y = max_y - elem.height;
        //                 prev.y = max_y - prev.height;
        //             case H_ALIGN.CENTER:
        //                 elem.y = Math.floor(prev.y + (prev.height - elem.height) * 0.5);
        //         }
        //     }
        // }
    }

    startPopAnim(x: number, y: number, dist_y: number) {
        this.alpha = 1;
        this.visible = true;
        this.interactive = false;
        // this.cacheAsBitmap = true; // Currently it makes the sprites dissapear, maybe it can be turned on at a later time?
        this.x = x;
        this.y = y;

        gsap.to(this, {
            duration: 0.25,
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
                        this.destroy({children: true});
                    }
                });
            }
        });
    }

    //// Convenience methods.

    /**
     * 
     * @param elems Array of string as 
     *  EITHER: 
     *  1) text to make a bitmap text from.
     *  OR
     *  2)sprite source prefixed with ">>" (double chevron) characters.
     * @param tas_opts { TAS_Opts }
     * @returns 
     */
    public static CreateTAS(elems: string[], tas_opts?: TAS_Opts): TextAndSprite {
        let tas = new TextAndSprite();
        for (let i = 0; i < elems.length; i++) {
            let str = elems[i];
            if (str.indexOf(">>") > -1) {
                str = str.replace(">>", "");
                let spr = tas.addSprite(str);

                // Make the Sprite roughly the same height as the bitmap text and keep the aspect ratio.
                spr.height = tas_opts?.bitmapTextStyle?.fontSize || TextAndSprite.DEFAULT_FONT_SIZE;
                spr.scale.x = spr.scale.y;
            }
            else {
                const bt_style = tas_opts?.bitmapTextStyle;
                tas.addText(str, { bitmapTextStyle: bt_style });
            }
        }

        const align = tas_opts?.align || TAS_ALIGN.horizontalCenter;
        let margin_x = tas_opts?.marginX || tas_opts?.margin || 0;
        let margin_y = tas_opts?.marginY || tas_opts?.margin || 0;
        let x = 0;
        let y = 0;

        switch (align) {
            case TAS_ALIGN.horizontalCenter:
                x = 0;
                for (let i = 0; i < tas.children.length; i++) {
                    const elem = tas.children[i] as Sprite | BitmapText;
                    elem.anchor.y = 0.5;
                    elem.x = x;
                    elem.y = 0;

                    x += elem.width + margin_x;
                }
                break;

            case TAS_ALIGN.horizontalTop:
                x = 0;
                for (let i = 0; i < tas.children.length; i++) {
                    const elem = tas.children[i] as Sprite | BitmapText;
                    elem.anchor.y = 0;
                    elem.x = x;
                    elem.y = 0;

                    x += elem.width + margin_x;
                }
                break;

            case TAS_ALIGN.horizontalBottom:
                x = 0;
                for (let i = 0; i < tas.children.length; i++) {
                    const elem = tas.children[i] as Sprite | BitmapText;
                    elem.anchor.y = 1;
                    elem.x = x;
                    elem.y = 0;

                    x += elem.width + margin_x;
                }
                break;

            case TAS_ALIGN.verticalCenter:
                y = 0;
                for (let i = 0; i < tas.children.length; i++) {
                    const elem = tas.children[i] as Sprite | BitmapText;
                    elem.anchor.x = 0.5;
                    elem.x = 0;
                    elem.y = y;

                    y += elem.height + margin_y;
                }
                break;

            case TAS_ALIGN.verticalLeft:
                y = 0;
                for (let i = 0; i < tas.children.length; i++) {
                    const elem = tas.children[i] as Sprite | BitmapText;
                    elem.anchor.x = 0;
                    elem.x = 0;
                    elem.y = y;

                    y += elem.height + margin_y;
                }
                break;

            case TAS_ALIGN.verticalRight:
                y = 0;
                for (let i = 0; i < tas.children.length; i++) {
                    const elem = tas.children[i] as Sprite | BitmapText;
                    elem.anchor.x = 1;
                    elem.x = 0;
                    elem.y = y;

                    y += elem.height + margin_y;
                }
                break;
        }

        return tas;
    }

}

export interface TAS_Opts {
    bitmapTextStyle?: Partial<IBitmapTextStyle>,
    align?: string,
    marginX?: number,
    marginY?: number,
    margin?: number
}

export interface TextOpts {
    bitmapTextStyle?: Partial<IBitmapTextStyle>,
    x?: number,
    y?: number,
    // vAlignToPrev?: V_ALIGN,
    // hAlignToPrev?: H_ALIGN,
}

// export enum V_ALIGN {
//     LEFT = "left",
//     RIGHT = "right",
//     CENTER = "center"
// }

// export enum H_ALIGN {
//     TOP = "top",
//     BOTTOM = "bottom",
//     CENTER = "center"
// }