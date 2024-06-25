import { GameConfig } from "../../config/GameConfig";
import { IItemElement } from "../../config/Item";
import { IPropElement } from "../../config/Prop";
import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { CoreGameplay, GameMode, PlayerRace } from "../../const/enum";
import { SoundManager } from "../../utils/SoundManager";
import InteractBtn from "../../utils/UI/InteractBtn";
import UITools from "../../utils/UI/UITools";
import { utils } from "../../utils/uitls";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import BagModuleC from "../Bag/BagModuleC";
import { PropId, PropType } from "../Bag/PropEnum";
import { MonsterChangeC } from "../ChangeMonster/MonsterChangeC";
import { TaskEnum } from "../Guide/TaskEnum";
import PlayerAssetModuleData from "../PlayerAsset/PlayerAssetMData";
import PlayerAssetModuleC from "../PlayerAsset/PlayerAssetModuleC";
import TimeModuleC from "../Time/TimeModuleC";
import { WeaponModuleC } from "../weaponModule/WeaponModuleC";
import FindModuleS, { PropInfo_S } from "./FindModuleS";

class PropInfo_C {
    /**道具唯一标识 */
    propKey: number;
    /**道具配置信息 */
    propConf: IItemElement;
    /**道具对象 */
    propObj: GameObject;

    constructor(key: number, conf?: IItemElement, obj?: GameObject) {
        this.propKey = key;
        this.propConf = conf;
        this.propObj = obj;
    }
}

export default class FindModuleC extends ModuleC<FindModuleS, null> {


    /**道具map */
    private propMap: Map<number, PropInfo_C> = new Map();
    /**背包模块 */
    private bagMC: BagModuleC;
    /**生成点位置列表 */
    private generPosLs: Vector[] = [];
    /**可生成道具的id列表 */
    private generPropConfLs: IItemElement[] = [];
    /**是否可以弹背包已满UI */
    private canShowBagFullUI: boolean = true;
    /**生成点指针 */
    private generateKey: number = 0;

    protected onStart(): void {
        let propConfs = GameConfig.Item.getAllElement();
        this.bagMC = ModuleService.getModule(BagModuleC);

        let pointsConf = GameConfig.ItemPoint.getAllElement();

        // 初始化生成点
        pointsConf.forEach(conf => {
            if (conf.ObjectType == 1) {
                this.generPosLs.push(conf.Point);
            }
            // console.log("生成道具位置: " + conf.Point);
        })

        // 将场景生成道具的id 加入列表，道具生成数量是多少就加入几个配置进列表
        propConfs.forEach((conf) => {
            let generateNum = conf.CreateNum;
            for (let i = 0; i < generateNum; i++) {
                this.generPropConfLs.push(conf);
            }
        })
    }

    protected onEnterScene(sceneType: number): void {
        // 初始化场景道具
        this.net_spawnProps();

        ModuleService.getModule(TimeModuleC).onNightStart.add(() => {
            InteractBtn.instance.removeAllClickFun();
        });
    }


    /**生成白天所有道具 */
    public async net_spawnProps() {
        await TimeUtil.delaySecond(2);
        // 先清除所有道具(同步方法, 不用await)
        await this.clearAllProp();
        this.generateKey++;
        // 打乱生成点
        utils.shuffleArray(this.generPosLs);
        // 每帧生成五个道具
        let spawnCountPerFrame = 5;
        // 生成道具
        for (let j = 0; j < this.generPropConfLs.length; j++) {
            if (this.generateKey % spawnCountPerFrame == 0) {
                await TimeUtil.delaySecond(0.01);
            }
            let pos = this.generPosLs[this.generateKey % this.generPosLs.length];
            let propConf = this.generPropConfLs[this.generateKey % this.generPropConfLs.length];
            this.spawnProp(this.generateKey, pos, propConf);

            this.generateKey++;
        }
    }


    /**生成单个道具 */
    private async spawnProp(key: number, pos: Vector, propConf: IItemElement) {

        if (pos == null)
            return console.error("lmn error 生成道具位置为空, generateKey = " + key);
        // 如果玩家没有付费枪，不生成付费子弹
        let data = DataCenterC.getData(PlayerAssetModuleData);
        if (propConf.Tab == PropType.Bullet && ModuleService.getModule(PlayerAssetModuleC).hasGun == false)
            // return console.error(`没有枪, 不生成子弹`);
            return;

        let propObj = await GameObjPool.asyncSpawn(propConf.AssetID, propConf.SourceType);
        if (propObj == null || propObj.worldTransform == null)
            return console.error("lmn error 生成道具失败！资源不存在:" + propConf.AssetID);

        propObj.worldTransform.position = pos;
        propObj.worldTransform.rotation = new Rotation(propConf.Rotate);
        if (propConf.Size == null) propConf.Size = Vector.one;
        propObj.worldTransform.scale = propConf.Size;

        let propInfo = new PropInfo_C(key, propConf, propObj);
        this.spawnTrigger(propObj, key);

        // 容错，如果当前key已经存在道具，则先回收
        if (this.propMap.has(key)) {
            this.despawnProp(this.propMap.get(key));
        }
        this.propMap.set(key, propInfo);
        // console.log("生成道具 " + propConf.Name);
    }


    /**生成运动器 */
    private async spawnMover(propObj: GameObject) {
        // 帧率低的玩家道具不转动
        if (utils.frameCount < 20) return;

        let mover = propObj.getChildByName("Mover") as IntegratedMover;
        if (!mover) {
            mover = await GameObject.asyncSpawn("IntegratedMover") as IntegratedMover;
            mover.name = "Mover";
            mover.parent = propObj;
            mover.rotationSpeed = new Vector(0, 0, 50);
            mover.rotationRepeat = false;
            mover.motionCoordinate = MotionAxis.WorldAxis;
            mover.smooth = true;
        }
        mover.enable = true;
    }

    /**生成触发器 */
    private async spawnTrigger(propObj: GameObject, key: number) {
        let trigger = propObj.getChildByName("Trigger") as Trigger;
        if (!trigger) {
            trigger = await GameObject.asyncSpawn("Trigger") as Trigger;
            trigger.name = "Trigger";
            trigger.parent = propObj;
            trigger.localTransform.position = Vector.zero;
            trigger.worldTransform.scale = Vector.one.multiply(1.5);
        }
        trigger.onEnter.clear();
        trigger.onLeave.clear();
        trigger.onEnter.add((obj) => {
            if (utils.checkTriggerGo(obj) == false) return;
            this.setOutline(key, true);
            // 增加交互按钮点击方法
            if (MonsterChangeC.curPlayerRace == PlayerRace.Human) {
                InteractBtn.instance.addClickFun(this.pickUpProp, this, key);
            }
            // console.log("lmn log: 进入拾取范围");
            // 显示任务详情
            let propConf = this.propMap.get(key)?.propConf;
            if (propConf == null) return;
            if (propConf.Tab == 3) ActionCommon.onShowTaskDetail.call(TaskEnum.pickUpProp);
            if (propConf.id == 1001) ActionCommon.onShowTaskDetail.call(TaskEnum.pickTranquillizer);
            if (propConf.id == 1017) ActionCommon.onShowTaskDetail.call(TaskEnum.pickGun);
        })
        trigger.onLeave.add((obj) => {
            if (utils.checkTriggerGo(obj) == false) return;
            this.setOutline(key, false);
            // 移除交互按钮点击方法
            InteractBtn.instance.removeClickFun(this.pickUpProp, this, key);
            // console.log("lmn log: 离开拾取范围")
        })
        trigger.enabled = true;
    }

    /**生成特效 */
    private async spawnEffect(propObj: GameObject, propConf: IPropElement) {
        // if (utils.frameCount < 20) return;
        let effect = propObj.getChildByName("Effect") as Effect;

        if (!effect) {
            let effConf = GameConfig.Effect.getElement(propConf.EffectID);
            effect = await GameObject.asyncSpawn(effConf.EffectID) as Effect;
            effect.name = "Effect";
            effect.parent = propObj;
            effect.localTransform.position = effConf.EffectLocation;
            effect.worldTransform.scale = effConf.EffectLarge;
            effect.localTransform.rotation = new Rotation(effConf.EffectRotate);
            effect.loop = true;
        }
        effect.play();

    }

    /**设置描边 */
    private setOutline(key: number, isOpen: boolean) {
        let propInfo = this.propMap.get(key);
        if (!propInfo) return;
        let mesh = propInfo.propObj as Model;
        try {
            mesh.setPostProcessOutline(isOpen, GlobalData.Prop.propOutlineColor);
        } catch (error) { }
    }

    /**拾取道具 */
    public pickUpProp(key: number) {

        // this.propMap.forEach((propInfo, key) => {
        //     console.log("道具key = " + key, "info = " + propInfo);
        // });
        let propInfo = this.propMap.get(key);
        if (propInfo == null) {
            let keys = []
            this.propMap.forEach((v, k) => {
                keys.push(k);
            })
            console.error("lmn error 拾取的道不存在, key = " + key);
            console.error("map中的key为：" + keys.join(","));
            return;
        }
        let conf = propInfo.propConf;
        // 特殊拾取
        if (conf.IsInBag == false) {
            this.specialPick(propInfo);

            return;
        }
        // 检测背包是否满
        if (this.bagMC.checkBagIsFull()) {
            if (this.canShowBagFullUI) {
                UITools.ShowSoftTips(utils.getLanguageByKey("Tips_02"));
                this.canShowBagFullUI = false;
                setTimeout(() => {
                    this.canShowBagFullUI = true;
                }, GlobalData.Prop.bagFullCd * 1000);
            }
            return;
        }
        // 加入背包
        UITools.ShowSoftTips(conf.Name);
        // S端道具的起始Key为10000
        if (key < 10000) {
            this.bagMC.addPropToBag(conf.id);
            this.despawnAndSpawnNew(propInfo);
        } else {
            // S端道具
            let isSuccess = this.server.net_despawnProp(key)
            if (isSuccess) this.bagMC.addPropToBag(conf.id);
        }
        if (conf.Tab == 3) ActionCommon.onTaskComplete.call(TaskEnum.pickUpProp);
        if (conf.id == 1001) ActionCommon.onTaskComplete.call(TaskEnum.pickTranquillizer);
        if (conf.id == 1017) ActionCommon.onTaskComplete.call(TaskEnum.pickGun);
        ModuleService.getModule(AnalyticsModuleC).finishCoreStrp(CoreGameplay.pickProp);
        ModuleService.getModule(AnalyticsModuleC).pickItem(conf.id);
    }

    private despawnAndSpawnNew(propInfo: PropInfo_C) {
        // C端道具
        this.despawnProp(propInfo);
        // 同时生成一个新的道具
        let pos = this.generPosLs[this.generateKey % this.generPosLs.length];
        let propConf = this.generPropConfLs[this.generateKey % this.generPropConfLs.length];
        this.spawnProp(this.generateKey, pos, propConf);
        this.generateKey++;
    }

    /**回收道具 */
    private despawnProp(propInfo: PropInfo_C) {

        let obj = propInfo.propObj;
        this.setOutline(propInfo.propKey, false);
        GameObjPool.despawn(obj);
        // 关运动器
        let mover = obj.getChildByName("Mover") as IntegratedMover;
        if (mover) {
            mover.enable = false;
        }
        // 关特效
        let effect = obj.getChildByName("Effect") as Effect;
        if (effect) {
            effect.stop();
        }
        // 关触发器
        let trigger = obj.getChildByName("Trigger") as Trigger;
        if (trigger) {
            trigger.enabled = false;
        }
        // 从map中移除
        this.propMap.delete(propInfo.propKey);
    }

    /**清除所有道具 */
    private async clearAllProp() {
        let totalCount = 0;
        /**每帧回收道具数 */
        let despawnCountPerFrame = 5;
        for (const [k, v] of this.propMap) {
            if (totalCount % despawnCountPerFrame == 0) {
                await TimeUtil.delaySecond(0.01);
            }
            this.despawnProp(v);
            totalCount++;
        }
    }


    /**特殊拾取 */
    specialPick(propInfo: PropInfo_C) {
        let conf = propInfo.propConf;
        if (conf.Tab == PropType.Bullet) {
            let weapCfgId = GameConfig.Item.getElement(conf.id).WeaponId
            let res = ModuleService.getModule(WeaponModuleC).addBullet(weapCfgId, 5);
            if (!res)
                return UITools.ShowSoftTips("子弹已满!");
            this.despawnAndSpawnNew(propInfo);
            UITools.ShowSoftTips("获得子弹!");
        }
    }

    // -----------------------------------net-----------------------------------

    public net_spawnAllProp_S(propInfo_S: PropInfo_S[]) {
        propInfo_S.forEach(propInfo => {
            let pos = GameConfig.ItemPoint.getElement(propInfo.propPosId).Point;
            let propConf = GameConfig.Item.getElement(propInfo.propId);
            this.spawnProp(propInfo.propKey, pos, propConf);
        })
    }

    /** 显示拾取提示信息 */
    public net_showTips(str: string, soundId?: number) {
        if (str && str != "")
            UITools.ShowSoftTips(str);
        if (soundId && soundId > 0)
            SoundManager.instance.playSound(soundId);
    }

    /**回收道具 */
    public net_despawnProp(key: number) {
        let propInfo = this.propMap.get(key);
        if (!propInfo) {
            console.error("lmn error 道具已回收，key = " + key);
            return;
        }
        this.despawnProp(propInfo);
    }
}