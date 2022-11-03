import { Emitter } from "@pixi/particle-emitter";
import { upgradeConfig } from "@pixi/particle-emitter";
import { ParticleContainer, Container, Texture } from "pixi.js";
import { LOGICAL_GAME_SPACE } from "../GG";

export default class ParticlesScreen extends Container {

    emitter: Emitter;
    isRunning: boolean = false;

    constructor() {
        super();

        let old_config = {
            "alpha": {
                "start": 0.55,
                "end": 1
            },
            "scale": {
                "start": 0.3,
                "end": 0.1,
                "minimumScaleMultiplier": 0.2
            },
            "color": {
                "start": "#fcf803",
                "end": "#f20808"
            },
            "speed": {
                "start": 3,
                "end": 0,
                "minimumSpeedMultiplier": 50
            },
            "acceleration": {
                "x": 0,
                "y": -700
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": -100,
                "max": -80
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": -0,
                "max": 0
            },
            "lifetime": {
                "min": 0.25,
                "max": 0.35
            },
            "blendMode": "normal",
            "frequency": 0.015,
            "emitterLifetime": -1,
            "maxParticles": 10,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "point"
        }

        this.emitter = new Emitter(this, upgradeConfig(old_config, [
            "assets/img/Explo1MC0002.png", "assets/img/Explo1MC0003.png", "assets/img/Explo1MC0004.png"
        ]));

        this.emitter.emit = true;
        this.emitter.updateSpawnPos(LOGICAL_GAME_SPACE.halfWidth, LOGICAL_GAME_SPACE.halfHeight);
    }

    update(delta: number) {
        if (!this.isRunning) {
            return;
        }

        this.emitter.update(delta * 0.01);
    }
}