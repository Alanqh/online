
const TEMP = new mw.Vector();
export class Swoop {
    /**飞扑动画 */
    private animation: mw.Animation;
    private isFlying: boolean = false;
    private timeOut: number = 0.2;
    constructor(public aiModel: mw.Character,
        private force: Vector,
        upV: Vector,
        private posY: number,
        animGuid: string,
        animRate: number) {

        // console.log("NPC Swoop")

        aiModel.jump();
        if (upV != null) {
            this.isFlying = true;
            this.timeOut = -1;
            aiModel.addImpulse(upV, true);
        }
        if (this.force != null) {

            if (!this.isFlying) {
                this.timeOut = 0.2;
            }

            this.animation = this.aiModel.loadAnimation(animGuid);
            this.animation.loop = 0;
            this.animation.speed = animRate;
        }
    }

    public onUpdate(dt: number): boolean {
        if (this.timeOut > 0) {
            this.timeOut -= dt;
            if (this.timeOut <= 0) {
                this.animation.play();
                if (this.force) {
                    this.aiModel.addImpulse(this.force, true);
                }
            }
            return false;
        }

        if (this.isFlying) {
            if (this.aiModel.worldTransform.position.z >= this.posY) {
                this.isFlying = false;

                if (this.force) {
                    // console.log("起飞结束 添加冲量", this.force)
                    this.aiModel.addImpulse(this.force, true);
                }
            }
            return false;
        }
        const isEnd = !this.aiModel.isJumping;
        if (isEnd) {
            this.animation.stop();
        }
        return isEnd;

    }
}