import { ClassInstance } from "../../tools/ClassInstance/ClassInstance";

class InGearCharacter{
    private enterTween: Tween<{x: number}>;
    private exitTween: Tween<{x: number}>;
    public enterGear(character: Character, gear: ConveyerBelt){
        this.stopExitTween();
        if (this.enterTween) {
            this.enterTween.stop();
        }
        let speed = gear.speed;
        let forward = gear.gameObject.worldTransform.getForwardVector();
        let time = 10;
        let zOffset = character.getBoundingBoxExtent().z / 2.5;
        let downEndPoint: mw.Vector = mw.Vector.zero;
        let beforeTime: number = 0;
        let nowTime: number = 0;
        this.enterTween = new Tween<{x: number}>({x: 0})
        .to({x: time}, time* 1000)
        .onUpdate((param)=>{
            nowTime = param.x;
            let dt = nowTime - beforeTime;
            let curPlayerPos =  ClassInstance.getVectorClone(character.worldTransform.position);
            let v = ClassInstance.getVectorClone(curPlayerPos).add(ClassInstance.getVectorClone(forward).multiply(speed* dt));
            beforeTime = nowTime;
            let startPos = ClassInstance.getVectorClone(curPlayerPos);
            startPos.z += 10;
            let middleHitResult = QueryUtil.capsuleTrace(startPos, ClassInstance.getVectorClone(startPos).add(ClassInstance.getVectorClone(forward).multiply(60)), character.collisionExtent.x * 0.5, character.collisionExtent.y* 0.5, true, false);


            // 腰前方有碰撞
            for (let hit of middleHitResult) {
                if (hit.gameObject == character) continue;
                if (hit.gameObject instanceof mw.Trigger) continue;
                if (hit.gameObject instanceof mw.UIWidget) continue;
                // oTrace('guan log 腰前方有碰撞 ', hit.gameObject.name, TimeUtil.elapsedTime());
                return;
            }

            // oTrace('guan log 无碰撞', TimeUtil.elapsedTime());
            character.worldTransform.position = v;
        })
        .onRepeat(()=>{
            beforeTime = 0;
            nowTime = 0;
        })
        .repeat(Infinity)
        .start();
    }
    
    public exitGear(character: Character, gear: ConveyerBelt){
        if (this.enterTween) {
            this.enterTween.stop();
        }
        let forward = gear.gameObject.worldTransform.getForwardVector();
        let lastTime = gear.slowTime;
        let zOffset = character.getBoundingBoxExtent().z / 2.5;
        /**匀减速计算路程公式 v0+vt/2* t */
        let downEndPoint: mw.Vector = mw.Vector.zero;
        let originSpeed: number = gear.speed;
        let beforeSpeed: number = originSpeed;
        /**加速度 */
        let acce: number = originSpeed/ lastTime;
        let nowSpeed: number = 0;
        this.exitTween = new Tween<{x: number}>({x: originSpeed})
        .to({x: 0}, lastTime* 1000)
        .onUpdate((dt)=>{
            nowSpeed = dt.x;
            let curPlayerPos =  ClassInstance.getVectorClone(character.worldTransform.position);
            let downTime = (beforeSpeed- nowSpeed)/ acce;
            let v = ClassInstance.getVectorClone(curPlayerPos).add(ClassInstance.getVectorClone(forward).multiply((beforeSpeed+ nowSpeed)/2* downTime));
            beforeSpeed = nowSpeed;
            let middleHitResult = QueryUtil.lineTrace(curPlayerPos, v, true, false);

            // 脚部检测
            curPlayerPos.z -= zOffset;
            downEndPoint.x = v.x;
            downEndPoint.y = v.y;
            downEndPoint.z = curPlayerPos.z;

            let downHitResult = QueryUtil.lineTrace(curPlayerPos, downEndPoint, true, false);

            // 腰前方有碰撞
            for (let hit of middleHitResult) {
                if (hit.gameObject == character) continue;
                if (hit.gameObject instanceof mw.Trigger) continue;
                if (hit.gameObject instanceof mw.UIWidget) continue;
                // oTrace('guan log 腰前方有碰撞 ', hit.gameObject.name, TimeUtil.elapsedTime());
                return;
            }

            // 脚前方有碰撞
            for (let hit of downHitResult) {
                if (hit.gameObject == character) continue;
                if (hit.gameObject instanceof mw.Trigger) continue;
                if (hit.gameObject instanceof mw.UIWidget) continue;
                // oTrace('guan log 脚前方有碰撞 ', hit.gameObject.name, TimeUtil.elapsedTime());
                return;
            }

            // oTrace('guan log 无碰撞', TimeUtil.elapsedTime());
            character.worldTransform.position = v;
        })
        .onComplete(()=>{
            gear.exitTweenComplete(character);
        })
        .start();
    }

    private stopExitTween(){
        if (!this.exitTween) {
            return;
        }
        this.exitTween.stop();
    }

    public stopAllTween(){
        if (this.enterTween) {
            this.enterTween.stop();
        }
        if (this.exitTween) {
            this.exitTween.stop();
        }
    }
}
@Component
export default class ConveyerBelt extends Script {
    @mw.Property({ displayName: "每秒位移距离(挂在触发器上,触发器的x轴正方向为移动方向)" })
	public speed: number = 0;
    @mw.Property({ displayName: "减速时间，从减速带上减速的时间，别太长,也别写零" })
    public slowTime: number = 0;
    private inGearMap: Map<Character, InGearCharacter> = new Map();
    private exitGearMap: Map<Character, InGearCharacter> = new Map();
    /**玩家跳跃进入的时候不会出发传送带处理一下 */
    private awaitEnterGearMap: Map<Character, boolean> = new Map();
    /**玩家制空退出的时候不会马上脱离传送带加速 */
    private awaitExitGearMap: Map<Character, boolean> = new Map();
    private player: mw.Player;

    protected async onStart() {
        if (SystemUtil.isServer()) {
            return;
        }
        this.player = await mw.Player.asyncGetLocalPlayer();
        this.useUpdate = true;
        if (this.gameObject instanceof Trigger) {
            this.gameObject.onEnter.add((other: GameObject)=>{
                this.onTriggerEnter(other);
            })
            this.gameObject.onLeave.add((other: GameObject)=>{
                this.onTriggerExit(other);
            })
        }
    }

    private onTriggerEnter(other: GameObject){
        if (this.checkFunc(other) && this.inGearMap.has(other as Character) == false) {
            let char = other as Character;
            if (this.awaitExitGearMap.has(char)) {
                this.exitGear(char);
                this.awaitExitGearMap.delete(char);
            }

            if (char.isJumping) {
                this.awaitEnterGearMap.set(char, true);
                return;
            }

            if (this.exitGearMap.has(char)) {
                let inGear = this.exitGearMap.get(char);
                inGear.enterGear(char, this);
                this.exitGearMap.delete(char);
                this.inGearMap.set(char, inGear);
                return;
            }
            let inGear = new InGearCharacter();
            inGear.enterGear(char, this);
            this.inGearMap.set(char, inGear);
        }
    }

    private onTriggerExit(other: GameObject){
        let isTarget = this.checkFunc(other);
        if (isTarget) {
            let char = other as Character;
            if (this.awaitEnterGearMap.has(char)) {
                this.awaitEnterGearMap.delete(char);
            }
        }
        if (isTarget && this.inGearMap.has(other as Character)) {
            let char = other as Character;
            let inGear = this.inGearMap.get(char);
            this.exitGearMap.set(char, inGear);
            this.inGearMap.delete(char);
            if (char.isJumping) {
                this.awaitExitGearMap.set(char, true);
                return;
            }
            this.exitGear(char);
        }
    }

    protected onUpdate(dt: number): void {
        this.awaitExitGearMap.forEach((value, index)=>{
            if (index.isJumping) {
                return;
            }
            this.exitGear(index);
            this.awaitExitGearMap.delete(index);
        })
        this.awaitEnterGearMap.forEach((value, index)=>{
            if (index.isJumping) {
                return;
            }
            this.onTriggerEnter(index);
            this.awaitEnterGearMap.delete(index);
        })
        
    }

    private checkFunc(other: GameObject){
        if (other instanceof Character && other.player == this.player || other instanceof Character && !other.player) {
            return true;        
        }
        return false;
    }

    public exitTweenComplete(character: Character){
        if (this.exitGearMap.has(character) == false) {
            return;
        }
        this.exitGearMap.delete(character);
    }

    private exitGear(char: Character){
        let inGear = this.exitGearMap.get(char);
        if (!inGear) {
            return;
        }
        inGear.exitGear(char, this);
    }

    protected onDestroy(): void {
        this.inGearMap.forEach((value)=>{
            value.stopAllTween();
        })
        this.exitGearMap.forEach((value)=>{
            value.stopAllTween();
        })
        this.inGearMap.clear();
        this.exitGearMap.clear();
        this.awaitEnterGearMap.clear();
        this.useUpdate = false;
    }
}