import TipsUI from "../common/Tips";
import { GameConfig } from "../config/GameConfig";
import { Prop } from "../modules/PropModule/Prop";
import { PropModuleC } from "../modules/PropModule/PropModuleC";
import { Utils } from "../tool/Utils";
import Tips_Generate from "../ui-generate/common/Tips_generate";



export class OverturnClient {

    icelolly: string = "9F9C93EA4122975D25D2CA8221B7030C";
    private static _instance: OverturnClient;
    propList: { obj: GameObject, time: number, index: number }[] = [];
    //最大道具数
    maxProp: number = 2;
    propPoints: Vector[] = [];

    propTime: number = 10;
    public static get instance(): OverturnClient {
        if (!this._instance) {
            this._instance = new OverturnClient();
        }
        return this._instance;
    }
    guid: string = "33DCAC81"
    //所有格子
    public cells: Cell[] = [];

    //等待翻转的格子
    private waitCells: number[][] = [];
    time: number = 0;

    destroyCells: number[][] = [[37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], [1, 2, 3, 4, 5, 6]];
    isStop: boolean = false;
    constructor() {
        Utils.downloadAsset(this.icelolly)
        this.maxProp = GameConfig.GameParam.getElement(12).value;
        this.propTime = GameConfig.GameParam.getElement(13).value;
        this.propPoints = GameConfig.Points.getElement(1).points;
        let interId = setInterval(() => {
            const gameObject: GameObject = GameObject.findGameObjectById(this.guid);
            if (gameObject) {
                this.addCells(gameObject);
                clearInterval(interId);
            }
        }, 100)

        Event.addServerListener("Overturn.Update", (graphId: number) => {
            this.waitCells.push(...GameConfig.Graph.getElement(graphId).cells);
        });
        Event.addServerListener("Overturn.Start", () => {
            TipsUI.show(GameConfig.Language.UI_LAN_281.Value);
        });
        Event.addServerListener("Overturn.Stop", () => {
            this.isStop = true;
        });
        Event.addServerListener("Overturn.End", () => {
            for (let i = 0; i < this.cells.length; i++) {
                this.cells[i].stop();
            }
            Event.dispatchToLocal(Prop.unEquipProp, Player.localPlayer.character.gameObjectId)
        });

        Event.addServerListener("Prop.Spawn", (props: number[]) => {
            console.log("生成道具++++++++++");
            for (let i = 0; i < props.length && this.propList.length < this.maxProp; i++) {
                if (!this.propList.find(a => a.index == props[i])) {
                    const position = this.propPoints[props[i]];
                    const p = GameObject.spawn(this.icelolly);
                    p.worldTransform.position = position;
                    this.propList.push({ obj: p, time: this.propTime, index: props[i] });
                }

            }
        })

        Event.addLocalListener("Prop.Pick", (guid: string) => {
            for (let i = 0; i < this.propList.length; i++) {
                const prop = this.propList[i];
                if (prop.obj.gameObjectId == guid) {
                    prop.obj.destroy();
                    this.propList.splice(i, 1);
                    i--;
                }
            }
        })
    }


    addCells(gameObject: GameObject) {
        const children = gameObject.getChildren();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let material = GameConfig.GameParam.getElement(9).strValue;
            if (0 < i && i <= 6) {
                material = GameConfig.GameParam.getElement(5).strValue;
            } else if (i > 6 && i <= 18) {
                material = GameConfig.GameParam.getElement(6).strValue;
            } else if (i > 18 && i <= 36) {
                material = GameConfig.GameParam.getElement(7).strValue;
            } else if (i > 36 && i <= 60) {
                material = GameConfig.GameParam.getElement(8).strValue;
            }
            this.cells[i] = new Cell(child, material, GameConfig.GameParam.getElement(1).strValue, i);
        }
    }
    onUpdate(dt: number) {
        if (this.time <= 0) {
            if (this.waitCells.length > 0) {
                const array = this.waitCells.shift();
                for (let i = 0; i < array.length; i++) {
                    if (this.cells[array[i]]) {
                        this.cells[array[i]].overturn();
                    }
                }
                this.time = GameConfig.GameParam.getElement(2).value;
            } else {
                if (this.isStop) {
                    let cell = this.cells.find(a => a.isTurn)
                    if (!cell && this.destroyCells.length > 0) {
                        const array = this.destroyCells.shift();
                        for (let i = 0; i < array.length; i++) {
                            if (this.cells[array[i]]) {
                                this.cells[array[i]].destroy();
                            }
                        }
                        this.time = GameConfig.GameParam.getElement(2).value;
                    }
                }
            }
        } else {
            this.time -= dt;
        }

        for (let i = 0; i < this.propList.length; i++) {
            const prop = this.propList[i];
            prop.time -= dt;
            if (prop.time <= 0) {
                prop.obj.destroy();
                this.propList.splice(i, 1);
                i--;
            }
        }
    }
}
let rotation = new Rotation();
class Cell {

    //是否正在翻转
    isTurn: boolean = false;
    gameObject: mw.GameObject;

    cell: mw.GameObject;

    material: string;

    warnMaterial: string;
    id: number;

    constructor(gameObject: mw.GameObject, material: string, warnMaterial: string, id: number) {
        this.gameObject = gameObject;
        this.material = material;
        this.warnMaterial = warnMaterial;
        this.cell = gameObject.getChildren()[0];
        this.id = id;
    }

    /**
     * 翻转
     */
    overturn() {
        if (!this.isTurn) {
            this.isTurn = true;
            (this.cell as mw.Model).setMaterial(this.warnMaterial)
            let z = this.gameObject.localTransform.rotation.z;
            let x = this.gameObject.localTransform.rotation.x;
            TimeUtil.delaySecond(GameConfig.GameParam.getElement(3).value).then(() => {
                new mw.Tween({ rotX: x }).to({ rotX: x + 180 }, GameConfig.GameParam.getElement(4).value * 1000).onUpdate((o) => {
                    rotation.x = o.rotX;
                    rotation.z = z;
                    this.gameObject.localTransform.rotation = rotation;
                }).start().onComplete(() => {
                    this.isTurn = false;
                    (this.cell as mw.Model).setMaterial(this.material)
                });
            })
        }
    }

    tween

    destroy() {
        (this.cell as mw.Model).setMaterial(this.warnMaterial)
        let vec = new Vector();
        vec.set(this.gameObject.localTransform.position)
        TimeUtil.delaySecond(1).then(() => {
            this.tween = new mw.Tween({ z: this.gameObject.localTransform.position.z }).to({ z: this.gameObject.worldTransform.position.z - 1000 }, 1500).onUpdate((o) => {
                vec.z = o.z;
                this.gameObject.localTransform.position = vec;
            }).start().onComplete(() => {
                this.cell.setVisibility(PropertyStatus.Off);
                this.cell.setCollision(PropertyStatus.Off);
            });
        })
    }

    stop() {
        if (this.tween) {
            this.tween.stop();
        }
    }
}