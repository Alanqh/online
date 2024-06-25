import { MGSGame } from "./mgs/MGSGame";
import { GeneralManager } from './Modified027Editor/ModifiedStaticAPI';
import { Singleton } from "./tool/Singleton";

@Component
export default class MoleScript extends mw.Script {
    private mouseList: Mouse[] = [];
    @mw.Property({ replicated: true, onChanged: "onFaceEff" })
    faceGuid: string = ""
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (this.isRunningClient()) {
            InputUtil.onKeyDown(mw.Keys.U, () => {
                this.gmHit();
            })
            Event.addLocalListener("MOLE_HIT", (go: GameObject) => {
                if (go.tag == "mole") {
                    this.hitMole(go.gameObjectId);
                    Singleton.getIns(MGSGame).areaEnter(2);
                }
            });
        } else {
            setTimeout(() => {

                let mod = this.gameObject.getChildren();
                for (let i of mod) {
                    this.mouseList.push(new Mouse(i));
                }
                this.useUpdate = true;
            }, 3000);
            Event.addLocalListener("MOLE_HIT", (guid: string) => {
                this.moleActivision(guid, "151059");
            });
            Event.addLocalListener("MOLE_RADOM_FACE", (guid: string) => {
                this.faceGuid = guid;
            });
        }
    }
    protected onUpdate(dt: number): void {
        for (let i of this.mouseList) {
            i.onUpdate(dt);
        }
    }
    @RemoteFunction(mw.Server)
    private gmHit() {

        let mouse = this.mouseList[0];
        if (mouse) {
            mouse.onHit();
        }

    }
    @RemoteFunction(mw.Server)
    private hitMole(guid: string) {
        let mouse = this.mouseList.find(i => i.getGuid() == guid);
        if (mouse) {
            mouse.onHit();
        }
    }
    @RemoteFunction(mw.Client, mw.Multicast)
    private moleActivision(guid: string, asset: string, offz: number = 0, loopTime = 1) {
        const obj = GameObject.findGameObjectById(guid);
        if (obj) {
            const location = obj.worldTransform.position;
            location.z += 100 + offz;
            GeneralManager.rpcPlayEffectAtLocation(asset, location, loopTime, mw.Rotation.zero, new mw.Vector(3, 3, 3));
        }
    }
    private onFaceEff() {
        let asset = Math.random() > 0.5 ? "164705" : "117808";
        this.moleActivision(this.faceGuid, asset, 100, 2);
    }
}
class Mouse {
    private state: number = 0;
    private stateTime: number = 3;
    private faceTime: number = 0;
    private relativeLocation: mw.Vector;
    public getGuid(): string {
        return this.node.gameObjectId;
    }
    constructor(private node: mw.GameObject) {
        this.relativeLocation = node.localTransform.position;
    }
    public onHit() {
        if (this.state == 1) {
            this.stateTime = Math.floor(5 + (8 - 5) * Math.random());
            this.state = 2;
            Event.dispatchToLocal("MOLE_HIT", this.node.gameObjectId);
        }
        //广播表现
    }
    onUpdate(dt: number): void {
        switch (this.state) {
            case 0://上升
                this.relativeLocation.z += 100 * dt;
                if (this.relativeLocation.z > 100) {
                    this.stateTime = Math.floor(5 + (7 - 5) * Math.random());
                    this.faceTime = Math.floor(1 + (3 - 1) * Math.random());

                    this.state = 1;
                }
                break;
            case 1://地面
                this.stateTime -= dt;
                if (this.stateTime <= 0) {
                    this.state = 2;
                }
                if (this.faceTime > 0 && this.faceTime - dt <= 0) {
                    Event.dispatchToLocal("MOLE_RADOM_FACE", this.node.gameObjectId);
                }
                this.faceTime -= dt;
                break;
            case 2://下降
                this.relativeLocation.z -= 300 * dt;
                if (this.relativeLocation.z < 0) {
                    this.stateTime = Math.floor(5 + (8 - 5) * Math.random());
                    this.state = 3;
                }
                break;
            case 3://地下
                this.stateTime -= dt;
                if (this.stateTime <= 0) {
                    this.state = 0;
                }
                break;
        }
        const transform = this.node.localTransform
        transform.position = this.relativeLocation;
        this.node.localTransform = transform;
    }
}