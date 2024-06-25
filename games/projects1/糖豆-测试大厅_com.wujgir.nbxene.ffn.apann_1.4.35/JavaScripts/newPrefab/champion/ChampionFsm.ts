import { ChampionShow } from "./ChampionShow";
import ChampionUI from "./ChampionUI";

const STEP1_TIME_0 = 0.8;
const STEP1_TIME_1 = 0.7;
const STEP2_TIME = 0.7;
const STEP3_TIME = 2;
const STEP4_TIME = 2.5;
const STEP5_TIME = 0.5;
const ANIM_178179 = 1.5;
const ANIM_178369 = 0.5;
const ANIM_121410 = 0.4;
const ANIM_122432 = 0.75;


abstract class ChampionState {
    constructor(public owner: ChampionShow, public machine: ChampionMachine) { }

    abstract onEnter(): void;
    abstract onExit(): void;
    abstract onUpdate(dt: number): void;
}

export class ChampionMachine {
    private curState: ChampionState;
    private states: ChampionState[] = [];

    constructor(public owner: ChampionShow) {
    }

    public changeState(newState: TypeName<ChampionState>) {
        let state = this.states.find(state => state.constructor.name == newState.name);
        if (!state) {
            state = new newState(this.owner, this);
            this.states.push(state);
        }
        this.curState && this.curState.onExit();
        this.curState = state;
        this.curState.onEnter();
    }

    public onUpdate(dt: number) {
        this.curState && this.curState.onUpdate(dt);
    }

    public start() {
        this.changeState(Step1);
    }

    public stop() {
        this.curState && this.curState.onExit();
        this.curState = null;
    }
}

export class Step1 extends ChampionState {
    private timer: number;
    private anim: Animation;
    private isFountainPlay: boolean;
    private fountainOriLoc: Vector
    private fountainAimLoc: Vector;
    onEnter(): void {
        this.timer = 0;
        this.isFountainPlay = false;
        this.anim = this.owner.npc.loadAnimation("178179");
        this.anim.speed = ANIM_178179;
        this.anim.loop = 2;
        this.anim.play();
        this.fountainOriLoc = this.owner.fountain.worldTransform.position;
        this.fountainAimLoc = this.owner.scene.getChildByName("fountainLoc1").worldTransform.position;
    }
    onExit(): void {
        this.anim.stop();
        this.anim = null;
    }
    onUpdate(dt: number): void {
        this.timer += dt;
        if (this.timer >= STEP1_TIME_0) {
            this.owner.fountain.play();
            this.isFountainPlay = true;
        }
        if (this.isFountainPlay) {
            Vector.lerp(this.fountainOriLoc, this.fountainAimLoc, (this.timer - STEP1_TIME_0) / STEP1_TIME_1, TEMP_VEC);
            this.owner.fountain.worldTransform.position = TEMP_VEC;
            if (this.timer >= (STEP1_TIME_0 + STEP1_TIME_1)) {
                this.machine.changeState(Step2);
            }
        }
    }
}

export class Step2 extends ChampionState {
    private timer: number;
    private anim: Animation;
    private playerAimLoc: Vector;
    private playerOriLoc: Vector;
    private fountainOriLoc: Vector;
    private fountainAimLoc: Vector;
    private cameraOriLoc: Vector;
    private cameraAimLoc: Vector;
    onEnter(): void {
        this.timer = 0;
        this.anim = this.owner.npc.loadAnimation("178369");
        this.anim.speed = ANIM_178369;
        this.anim.loop = 0;
        this.anim.play();
        this.playerAimLoc = this.owner.scene.getChildByName("playerLoc1").worldTransform.position;
        this.playerOriLoc = this.owner.npc.worldTransform.position;
        this.fountainOriLoc = this.owner.fountain.worldTransform.position;
        this.fountainAimLoc = this.owner.scene.getChildByName("fountainLoc2").worldTransform.position;
        this.cameraOriLoc = this.owner.camera.worldTransform.position;
        this.cameraAimLoc = this.owner.scene.getChildByName("cameraLoc1").worldTransform.position;
    }
    onExit(): void {
        this.anim.stop();
        this.anim = null;
    }
    onUpdate(dt: number): void {
        this.timer += dt;
        easeInQuadraticBezier(this.playerOriLoc, this.playerAimLoc, this.timer / STEP2_TIME, TEMP_VEC);
        this.owner.npc.worldTransform.position = TEMP_VEC;
        easeInQuadraticBezier(this.fountainOriLoc, this.fountainAimLoc, this.timer / STEP2_TIME, TEMP_VEC);
        this.owner.fountain.worldTransform.position = TEMP_VEC;
        Vector.lerp(this.cameraOriLoc, this.cameraAimLoc, this.timer / STEP2_TIME, TEMP_VEC);
        this.owner.camera.worldTransform.position = TEMP_VEC;
        if (this.timer >= STEP2_TIME) {
            this.machine.changeState(Step3);
            EffectService.playAtPosition("200918", this.owner.npc.worldTransform.position, { loopCount: 1, scale: new Vector(1) })
        }
    }
}

export class Step3 extends ChampionState {
    private wind: Effect;
    private playerAimLoc: Vector;
    private playerOriLoc: Vector;
    private timer: number;
    private anim: Animation;
    onEnter(): void {
        this.timer = 0;
        this.wind = this.owner.scene.getChildByName("气流") as Effect;
        this.wind.worldTransform.position = this.owner.npc.worldTransform.position;
        this.wind.loop = true;
        this.wind.play();
        this.playerAimLoc = this.owner.scene.getChildByName("playerLoc2").worldTransform.position;
        this.playerOriLoc = this.owner.npc.worldTransform.position;

        this.anim = this.owner.npc.loadAnimation("121410");
        this.anim.loop = 1;
        this.anim.speed = ANIM_121410;
        this.anim.play();
    }
    onExit(): void {
        this.wind.stop();
        this.wind = null;
        this.anim.stop();
        this.anim = null;
    }
    onUpdate(dt: number): void {
        this.timer += dt;
        Vector.lerp(this.playerOriLoc, this.playerAimLoc, this.timer / STEP3_TIME, TEMP_VEC);
        this.owner.npc.worldTransform.position = TEMP_VEC;
        let rotation = this.owner.npc.worldTransform.position.subtract(this.owner.camera.worldTransform.position).toRotation();
        this.owner.camera.worldTransform.rotation = rotation;
        if (this.timer >= STEP3_TIME) {
            this.machine.changeState(Step4);
        }
    }

}

export class Step4 extends ChampionState {
    private playerAimLoc: Vector;
    private playerOriLoc: Vector;
    private timer: number;
    private anim: Animation;
    private cameraOriLoc: Vector;
    private cameraAimLoc: Vector;
    onEnter(): void {
        this.timer = 0;
        this.playerAimLoc = this.owner.scene.getChildByName("playerLoc3").worldTransform.position;
        this.playerOriLoc = this.owner.npc.worldTransform.position;
        this.cameraAimLoc = this.owner.scene.getChildByName("cameraLoc2").worldTransform.position;
        this.cameraOriLoc = this.owner.camera.worldTransform.position;
        this.anim = this.owner.npc.loadAnimation("122432");
        this.anim.speed = ANIM_122432;
        this.anim.loop = 1;
        this.anim.play();
        this.owner.scene.getChildByName("游泳池").setVisibility(false, true);
        this.owner.scene.getChildByName("舞台").setVisibility(true, true);
        this.owner.fountain.stop();
    }
    onExit(): void {
        this.anim.stop();
        this.anim = null;
    }
    onUpdate(dt: number): void {
        this.timer += dt;
        easeInQuadraticBezier(this.playerOriLoc, this.playerAimLoc, this.timer / STEP4_TIME, TEMP_VEC);
        this.owner.npc.worldTransform.position = TEMP_VEC;
        Vector.lerp(this.cameraOriLoc, this.cameraAimLoc, this.timer / STEP4_TIME, TEMP_VEC);
        this.owner.camera.worldTransform.position = TEMP_VEC;
        let rotation = this.owner.npc.worldTransform.position.subtract(this.owner.camera.worldTransform.position).toRotation();
        this.owner.camera.worldTransform.rotation = rotation;
        if (this.timer >= STEP4_TIME) {
            EffectService.playOnGameObject("157117", this.owner.npc, { loopCount: 1, scale: new Vector(2) });
            EffectService.playOnGameObject("179482", this.owner.npc, { loopCount: 1, rotation: new Rotation(-90, 0, 0) });
            this.machine.changeState(Step5);
        }
    }

}

export class Step5 extends ChampionState {
    private timer: number;
    private cameraOriLoc: Vector;
    private cameraAimLoc: Vector;
    private canUpdate: boolean;
    onEnter(): void {
        let newAnim = this.owner.npc.loadAnimation("122561");
        newAnim.speed = 1;
        newAnim.loop = 1;
        newAnim.play();
        newAnim.onFinish.add(() => {
            newAnim = this.owner.npc.loadAnimation("156811");
            newAnim.speed = 1;
            newAnim.loop = 1;
            newAnim.play();
        })

        this.canUpdate = false;
        setTimeout(() => {
            this.canUpdate = true;
        }, 250);

        this.timer = 0;
        this.cameraAimLoc = this.owner.scene.getChildByName("cameraLoc3").worldTransform.position;
        this.cameraOriLoc = this.owner.camera.worldTransform.position;
    }
    onExit(): void {

    }

    onUpdate(dt: number): void {
        if (!this.canUpdate) return;
        this.timer += dt;
        easeInQuadraticBezier(this.cameraOriLoc, this.cameraAimLoc, this.timer / STEP5_TIME, TEMP_VEC);
        this.owner.camera.worldTransform.position = TEMP_VEC;
        let rotation = this.owner.npc.worldTransform.position.subtract(this.owner.camera.worldTransform.position).toRotation();
        this.owner.camera.worldTransform.rotation = rotation;

        if (this.timer >= STEP5_TIME + 5) {
            // 5s后到结算界面
            Event.dispatchToLocal("LEVEL_SETTLE");
            UIService.hide(ChampionUI);
            this.machine.stop();
        }
    }
}

let TEMP_VEC: Vector = new Vector();

/**加速 */
function easeInQuadraticBezier(p0: Vector, p2: Vector, t: number, outer: Vector) {
    t = Math.min(1, Math.max(0, t)); // 限制 t 的取值在 [0, 1] 范围内
    const u = 1 - t;
    const p1 = new Vector(p2.x, p2.y, p0.z);
    outer.set(
        u * (u * p0.x + t * p1.x) + t * (u * p1.x + t * p2.x),
        u * (u * p0.y + t * p1.y) + t * (u * p1.y + t * p2.y),
        u * (u * p0.z + t * p1.z) + t * (u * p1.z + t * p2.z)
    );
}