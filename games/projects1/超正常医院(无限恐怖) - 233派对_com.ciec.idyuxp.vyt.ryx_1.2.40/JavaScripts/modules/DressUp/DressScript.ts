import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import NPCFollow from "../Player/NPCFollow";
import { PlayerModuleData } from "../Player/PlayerModuleData";
import { DressUpTab1, DressUpTab2 } from "./DressData";
import DressUpModuleData from "./DressUpModuleData";
import P_HeadCard from "./UI/P_HeadCard";

/**换装类 */
@Component
export class DressScript extends Script {

    /**玩家身上挂件物体 */
    public slotObj: Map<DressUpTab2, GameObject> = new Map();
    /**玩家身上挂件id */
    private lastObjId: Map<DressUpTab2, number> = new Map();

    /**死亡特效id (dress表) */
    @Property({ replicated: true, onChanged: 'updateDeadEff' })
    private deadEffectId: number = 0;
    /**入场特效预制体id */
    @Property({ replicated: true, onChanged: 'updateEnterEff' })
    private enterEffectId: number = 0;
    /**死亡特效预制体 (C端) */
    public deadEffectPrefab: GameObject = null;
    /**入场特效预制体 (C端) */
    public enterEffectPrefab: GameObject = null;

    /**头顶UI */
    public headUI: P_HeadCard;

    public owner: Player;
    @Property({ replicated: true })
    public ownerId: number;
    /**派蒙脚本 */
    private pendantScript: NPCFollow = null;



    async init(playerId: number) {
        console.error(`玩家id: ${playerId}`);
        this.owner = await Player.asyncGetPlayer(playerId);
        this.ownerId = playerId;

        Object.values(DressUpTab2).forEach((v) => {
            v = v as DressUpTab2;
            this.slotObj.set(v, null);
            this.lastObjId.set(v, null);
        });

        if (SystemUtil.isServer()) {
            let dressId = DataCenterS.getData(playerId, DressUpModuleData).getCurDressByTab2(DressUpTab2.HeadCard)?.id;
            let headCardId = GameConfig.Dress.getElement(dressId)?.sourceGuid;
            this.initHeadUI(playerId, Number(headCardId));
        }

        await TimeUtil.delaySecond(1);

        Object.values(DressUpTab2).forEach((v) => {
            v = v as DressUpTab2;
            this.slotObj.set(v, null);
            this.lastObjId.set(v, null);
        });
    }

    @RemoteFunction(mw.Server)
    test() {
        console.log(`map: ${JSON.stringify(this.slotObj)}`);
    }

    @RemoteFunction(mw.Client, mw.Multicast)
    private async initHeadUI(playerId: number, headUIConfId: number) {

        // 初始化玩家头顶ui
        this.headUI = UIService.create(P_HeadCard);
        this.owner = await Player.asyncGetPlayer(playerId);
        this.owner.character.overheadUI.setTargetUIWidget(this.headUI.uiWidgetBase);
        console.log("初始化头顶UI, id = " + headUIConfId);

        console.log(`this.owner = ${this.owner}`);

        this.headUI.setHeadUI(headUIConfId);
        this.headUI.setNickName(playerId);
    }


    /**根据当前装备的装扮数组更新玩家装扮 */
    public updateDress(nowArr: number[]) {
        if (!this.owner) {
            this.owner = Player.getPlayer(this.ownerId);
        }
        Object.values(DressUpTab2).filter(v => !Number.isNaN(Number(v))).forEach((v, index) => {
            let type = v as DressUpTab2;
            let now = nowArr[index];
            let tab1 = this.getParentTab(type);
            if (tab1 == null) return console.error(`lmn error tab1 == null, tab2 = ${type}`);
            // console.log(`>>>>>>>>>tab1: ${tab1}`);
            if (tab1 == DressUpTab1.Pendant) {
                this.updatePendant(now, type);
            } else if (tab1 == DressUpTab1.Card) {
                this.updateHeadUI_S(now);
            } else if (tab1 == DressUpTab1.Effect) {
                this.updateEffect(now, type);
            }

        });
    }

    /**更新挂件 */
    private updatePendant(dressId: number, type: DressUpTab2) {
        //卸载
        if (!dressId) {
            // console.warn(`lwj 卸载 ${type}`);

            let id = this.lastObjId.get(type);
            // console.warn(`lwj id ${id}`);
            if (GlobalData.FollowNPC.npcGuidByIdMap.get(id) && this.pendantScript) {
                console.warn(`lwj 派蒙卸载`);
                //派蒙卸载
                this.pendantScript.destroy();
                this.pendantScript = null;
            } else {
                //挂架卸载
                let lastObj = this.slotObj.get(type);
                if (lastObj) {
                    console.warn(`lwj 卸载 原物体`);
                    lastObj.parent = null;
                    GameObjPool.despawn(lastObj);
                }
            }
            this.lastObjId.set(type, null);
            this.slotObj.set(type, null);
            return;
        }

        //更新
        let old = this.lastObjId.get(type);
        if (dressId == old) {
            console.warn(`lwj == 无需更新`);
            return;
        }
        let cfg = GameConfig.Dress.getElement(dressId);
        let id = this.lastObjId.get(type);

        if (GlobalData.FollowNPC.npcGuidByIdMap.get(id)) { //上次是派蒙

            if (GlobalData.FollowNPC.npcGuidByIdMap.get(dressId)) { //当前是派蒙
                console.warn(`lwj 派蒙 更新`);
                //派蒙更新
                this.pendantScript.changeNPCCloth(dressId);

                this.lastObjId.set(type, dressId);
            } else {
                //派蒙卸载
                console.warn(`lwj 派蒙 卸载`);
                this.pendantScript.destroy();
                this.pendantScript = null;

                //挂件创建
                GameObjPool.asyncSpawn(cfg.sourceGuid).then((obj) => {
                    console.warn(`lwj 挂件创建assid = ${obj}`);
                    (obj as Model).setCollision(PropertyStatus.Off, true);
                    this.owner.character.attachToSlot(obj, cfg.sourcePoint);
                    obj.localTransform.position = cfg.sourceLocation;
                    obj.localTransform.rotation = new Rotation(cfg.sourceRotate)
                    obj.localTransform.scale = cfg.sourceLarge;

                    //更新数据
                    this.slotObj.set(type, obj);
                    this.lastObjId.set(type, dressId);
                });
            }

            this.lastObjId.set(type, dressId);
        } else {
            //上次是挂架

            //更新挂件
            let lastObj = this.slotObj.get(type);
            if (lastObj) {
                console.warn(`lwj 更新挂件`);
                lastObj.parent = null;
                GameObjPool.despawn(lastObj);
            }

            if (GlobalData.FollowNPC.npcGuidByIdMap.get(dressId)) { //当前是派蒙
                console.warn(`lwj 派蒙 创建`);
                //派蒙创建
                this.pendantScript = this.owner.character.addComponent(NPCFollow);
                this.pendantScript.init(this.owner, dressId);

                this.lastObjId.set(type, dressId);
            } else {

                console.warn(`lwj 挂件 创建 ${dressId}`);
                //挂件创建
                GameObjPool.asyncSpawn(cfg.sourceGuid).then((obj) => {
                    (obj as Model).setCollision(PropertyStatus.Off, true);
                    this.owner.character.attachToSlot(obj, cfg.sourcePoint);
                    obj.localTransform.position = cfg.sourceLocation;
                    obj.localTransform.rotation = new Rotation(cfg.sourceRotate)
                    obj.localTransform.scale = cfg.sourceLarge;

                    //更新数据
                    this.slotObj.set(type, obj);
                    this.lastObjId.set(type, dressId);
                });
            }



        }



    }

    /**更新头顶UI，广播给客户端 */
    private updateHeadUI_S(dressId: number) {
        // 没有装备名片的情况下装备默认名片
        console.log(`当前头顶UI id = ${dressId}`);
        if (dressId == null) {
            this.updateHeadUI_C(null);
            return;
        }
        let dressConf = GameConfig.Dress.getElement(dressId);
        let headCardConf = GameConfig.NameTitle.getElement(Number(dressConf.sourceGuid));
        if (headCardConf == null) return console.error(`lmn error headCardConf == null, dressId = ${dressId}`);
        // 更新头顶UI
        this.updateHeadUI_C(headCardConf.id);
    }


    /**更新头顶UI*/
    @RemoteFunction(mw.Client, mw.Multicast)
    private updateHeadUI_C(id: number) {
        console.log(`更新头顶ui id = ${id}`);
        // 根据配置设置头顶UI
        if (this.headUI) this.headUI.setHeadUI(id);
    }


    private updateEffect(dressId: number, type: DressUpTab2) {
        console.warn(`ownerId : ${this.ownerId}`);
        let data = DataCenterS.getData(this.ownerId, DressUpModuleData);
        let item = data.getCurDressByTab2(type);
        if (type == DressUpTab2.Death) {
            console.log(`type: ${type} id >>>>>>>>>>>>>>> ${item?.id}`);
            if (item == null) {
                this.deadEffectId = null;
                return;
            }
            this.deadEffectId = dressId;
        } else if (type == DressUpTab2.Enter) {
            console.log(`type: ${type} obj >>>>>>>>>>>>>>> ${item?.id}`);
            if (item == null) {
                this.enterEffectId = null;
                return;
            }
            this.enterEffectId = dressId;
        }
    }


    /**更新死亡特效 (属性同步) */
    private updateDeadEff() {
        if (this.deadEffectId == null) {
            if (this.deadEffectPrefab) this.deadEffectPrefab.destroy();
            return;
        }
        let conf = GameConfig.Dress.getElement(this.deadEffectId);

        GameObject.asyncSpawn(conf.sourceGuid).then((obj) => {
            this.deadEffectPrefab = obj;
            this.owner.character.attachToSlot(obj, conf.sourcePoint);
            obj.localTransform.position = conf.sourceLocation;
            obj.localTransform.rotation = new Rotation(conf.sourceRotate);
            obj.localTransform.scale = conf.sourceLarge;
        });
        console.log('生成死亡特效');
    }

    /**更新进场特效 (属性同步) */
    private updateEnterEff() {
        if (this.enterEffectId == null) {
            if (this.enterEffectPrefab) this.enterEffectPrefab.destroy();
            return;
        }
        let conf = GameConfig.Dress.getElement(this.enterEffectId);
        GameObject.asyncSpawn(conf.sourceGuid).then((obj) => {
            this.deadEffectPrefab = obj;
            this.owner.character.attachToSlot(obj, conf.sourcePoint);
            obj.localTransform.position = conf.sourceLocation;
            obj.localTransform.rotation = new Rotation(conf.sourceRotate)
            obj.localTransform.scale = conf.sourceLarge;
        });
        console.log('生成进场特效');
    }


    /**获取二级标签的父标签 */
    private getParentTab(tab2: DressUpTab2): DressUpTab1 {
        let confs = GameConfig.DressTab.getAllElement();
        for (let i = 0; i < confs.length; i++) {
            const conf = confs[i];
            if (conf.tabLevel != 1) continue;
            if (conf.childTabId.includes(tab2)) {
                return conf.id;
            }
        }
    }

}