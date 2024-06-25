import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme, GamesStartDefines } from "../../Defines";
import { LoadMgr } from "../../GamePlay/Framework/Tools/LoadManager";
import GameStart from "../../GameStart";
import { MainUI } from "../../ui/MainUI";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { TransHandle } from "../cameraCG/frameHandle/events/handles/TransHandle";
import { HandTrigger } from "../inter/HandTrigger";
import HandTriggerCom from "../inter/HandTriggerCom";
import { InterEvtData } from "../inter/ObjInterDefine";
import RecordData from "../record/RecordData";
import { UIGiftDisplay } from "../store/ui/UIGiftDisplay";
import FindCom from "./FindCom";
import { FindData } from "./FindData";
import FindModel from "./FindModel";
import { FindModuleS } from "./FindModuleS";
import { FindDocumentUI } from "./ui/FindDocumentUI";
import { FindRewardUI } from "./ui/FindRewardUI";
import { FindTipsUI } from "./ui/FindTipsUI";

export class FindModuleC extends ModuleC<FindModuleS, FindData> {
    private _isInHall: boolean = false;

    private _hallGoMap: Map<number, FindModel> = new Map();

    private _allGuideEffect: Effect[] = [];

    public curGuide: number = 0;

    public curTime: number = 0;

    protected onStart(): void {
        this.data.onDataChange.add(this.refreshRedPoint.bind(this))
        this.refreshRedPoint();
        this.curGuide = this.data.guideStage;
        this.curTime = this.data.startTime;
    }

    private refreshRedPoint() {
        const allProcessCfg = GameConfig.Find.getAllElement().filter(e => {
            return e.process && e.process <= this.data.finds.length;
        })
        /** 可以领取的数目 */
        const canGetCount = this.data.finds.length + allProcessCfg.length;
        /** 已经领取的数目 */
        const getCount = this.data.rewardItems.length;
        if (canGetCount > getCount) {
            UIService.getUI(MainUI).img_point.visibility = SlateVisibility.SelfHitTestInvisible;
        }
        else {
            UIService.getUI(MainUI).img_point.visibility = SlateVisibility.Collapsed;
        }
    }

    protected async onEnterScene(sceneType: number) {
        const gameThemeCfg = GameConfig.GameTheme.getAllElement().find(e => {
            return e.key == GamesStartDefines.gameTheme;
        })
        if (!gameThemeCfg) {
            console.error("未找到相应的游戏主题配置")
            return
        }
        const gameThemeId = gameThemeCfg.id;
        this._isInHall = gameThemeId == 1;
        const allCfgs = GameConfig.Find.getAllElement();
        for (let index = 0; index < allCfgs.length; index++) {
            const e = allCfgs[index];
            if (e.process) {
                continue;
            }
            if (e.gameTheme != gameThemeId) {
                continue;
            }
            let root: GameObject = await LoadMgr.asyncSpawn("BE771A55487D7B59B9FC0FA4ED654E24", { replicates: false })
            const modelRoot = root.getChildByName("model");
            let model = await LoadMgr.asyncSpawn(e.model, { replicates: false });
            model.parent = modelRoot;
            model.localTransform = this.getNewTrans()
            model.setVisibility(PropertyStatus.On);
            model.setCollision(PropertyStatus.On, true);
            if (!this.data.guideStage) {
                const size = model.getBoundingBox(true, true);
                let effect = await LoadMgr.asyncSpawn("129382") as Effect;
                effect.parent = modelRoot;
                effect.localTransform.position = new Vector(0, 0, Math.max(100, size.z))//  == 0 ? 100 : size.z * 2)
                effect.worldTransform.rotation = new Rotation(180, 0, 0);
                effect.worldTransform.scale = Vector.one.multiply(1);
                effect.loop = true;
                effect.play();
                this._allGuideEffect.push(effect);
            }
            if (this.data.isFined(e.id)) {
                root.setCollision(PropertyStatus.Off, true);
                root.getChildByName("pickEffect").setVisibility(PropertyStatus.Off, true);
                this.setAsWater(root);
            }
            else {
                root.name = e.id.toString();
                let handTrigger = root.addComponent(HandTriggerCom);
                root.addComponent(FindCom);
                let inter = new InterEvtData();
                inter.evtName = "FindCom";
                handTrigger.evtDataArr.push(inter);
            }
            if (e.followpoint && e.followpoint != "") {
                let followPoint = await GameObject.asyncFindGameObjectById(e.followpoint);
                if (followPoint) {
                    root.parent = followPoint;
                }
            }
            root.localTransform.position = e.pos;
            root.localTransform.rotation = new Rotation(e.modelrevolve);
            root.worldTransform.scale = Vector.one;
            model.worldTransform.scale = e.modelscale;
        }
        GameConfig.Find.getAllElement().forEach(e => {
            if (!this._isInHall) {
                return;
            }
            this.insHallItem(e.id);
        })
    }

    private async insHallItem(id: number) {
        const cfg = GameConfig.Find.getElement(id);
        if (cfg.process) {
            return;
        }
        let root = await LoadMgr.asyncSpawn("086C0118443188ABB5AB3786A2571493", { replicates: false })
        let modelPos = root.getChildByName("model")
        let model = await LoadMgr.asyncSpawn(cfg.hallModel, { replicates: false });
        if (!model) {
            return;
        }
        model.parent = modelPos;
        model.localTransform = this.getNewTrans();
        model.setVisibility(PropertyStatus.FromParent);
        model.setCollision(PropertyStatus.On, true);
        root.name = id.toString();
        root.worldTransform.position = cfg.hallPos;
        root.worldTransform.rotation = new Rotation(cfg.hallrevolve);
        model.worldTransform.scale = cfg.hallscale;
        model.worldTransform.rotation = new Rotation(cfg.collectrevolve);
        let handTrigger = root.addComponent(HandTriggerCom);
        let modelCom = root.addComponent(FindModel);
        let inter = new InterEvtData();
        inter.evtName = "FindModel";
        handTrigger.evtDataArr.push(inter);
        modelCom.cfg = cfg;
        modelCom.setIsFind(this.data.isFined(id));
        this._hallGoMap.set(id, modelCom);
    }

    public async findHallItem(id: number) {
        if (!this._isInHall) {
            return;
        }
        let model = this._hallGoMap.get(id);
        model.setIsFind(true);
    }

    public setAsWater(go: GameObject) {
        if (go instanceof Model) {
            const model = go as Model;
            model.setMaterial(GameConfig.SubGlobal.findEffect.string);
        }
        go.getChildren().forEach(e => {
            this.setAsWater(e);
        })
    }

    public reqFindItem(id: number) {
        const cfg = GameConfig.Find.getElement(id);
        if (!cfg) {
            return;
        }
        GhostTraceHelper.uploadMGS("ts_action_find", "Find相关操作上发", { item_id: id, pos_id: this.data.finds.length + 1 })
        this.server.net_findItem(id);
        UIService.getUI(FindTipsUI).showReward(cfg);
        if (this.data.guideStage) {
            return;
        }
        this._allGuideEffect.forEach(e => {
            e.destroy();
        })
        this._allGuideEffect.length = 0;
    }

    public async reqGetItemReward(id: number) {
        const cfg = GameConfig.Find.getElement(id);
        if (!cfg) {
            return;
        }
        if (!cfg.process && !this.data.isFined(id)) {
            return;
        }
        if (this.data.finds.length < cfg.process) {
            return;
        }
        let res = await this.server.net_getProcessItem(id);
        if (res) {
            UIService.show(FindRewardUI, cfg.rewards);
        }
    }

    private getNewTrans() {
        let trans = new Transform();
        trans.position = Vector.zero;
        trans.rotation = Rotation.zero;
        trans.scale = Vector.one;
        return trans;
    }
    /** findGuides */

    reqSetGuideStage(id: number) {
        this.curGuide = id;
        this.server.net_setGuide(id);
        if (id == 1) {
            this.curTime = DataCenterC.getData(RecordData).baseRecordInfo.totalOnlineTimesLength;
        }
    }
}