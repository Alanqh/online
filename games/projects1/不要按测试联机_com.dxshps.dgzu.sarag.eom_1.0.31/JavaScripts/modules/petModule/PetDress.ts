import { GameConfig } from "../../config/GameConfig";
import { IPetElement } from "../../config/Pet";
import PlayerName_Generate from "../../ui-generate/PlayerName_generate";
import { DressType, SuitInfo } from "./PetModuleData";

type slotData = { cfgId: number, obj: GameObject };

//TODO换装等待
export class PetPendant {
    /** 模型 */
    public _model: Character;
    /**角色平台名字 */
    private _name: string;
    /** 头衔名字控件 */
    private _headName: TextBlock;
    /** 头衔名字控件 */
    private _playerName: TextBlock;
    /**模型配置 */
    private _modelCfg: IPetElement;

    /** slots (不含宠物、头衔) */
    private _slotDataMap: Map<DressType, slotData> = new Map();


    constructor(char: Character, name?: string) {
        this._model = char;
        this._name = name;
        this.init();
    }

    init() {
        let nameUI = UIService.create(PlayerName_Generate);
        this._model.overheadUI.setTargetUIWidget(nameUI.uiWidgetBase);
        this._headName = nameUI.mText_PetName;
        this._playerName = nameUI.mText_PlayerName;
        this._playerName.text = this._name;
        this._playerName.visibility = SlateVisibility.SelfHitTestInvisible;
        this._headName.visibility = SlateVisibility.Collapsed;
    }


    /**全套换装 */
    public setSuitDress(info: SuitInfo, sys: boolean = false) {
        this._modelCfg = GameConfig.Pet.getElement(info.petId);
        let func = () => {
            this._model.syncDescription(sys);
            this._model.onDescriptionComplete.remove(func);
            this._model.setCollisionShapeAndExtent(this._modelCfg.collisionType, this._modelCfg.collisionScale);
            this._model.worldTransform.scale = this._modelCfg.scale;
            for (let i = 0; i < info.suit.length; i++) {
                if (i == DressType.Head) {
                    this.setUIText(info.suit[i]);
                    continue;
                }
                this.setPartDress(i, info.suit[i]);
            }
        };
        this._model.onDescriptionComplete.add(func);
        this._model.clearDescription();//
        this._model.description.base.wholeBody = this._modelCfg.guid;
    }


    //设置宠物头衔
    private setUIText(headId: number) {
        this._playerName.visibility = SlateVisibility.Collapsed;
        this._headName.visibility = SlateVisibility.SelfHitTestInvisible;
        let modeName = this._model.player ? this._name : this._modelCfg.name;
        let text: string
        if (!headId) {//卸下
            text = modeName;
            this._headName.text = text;
            return;
        }
        let headCfg = GameConfig.Decoration.getElement(headId);
        headCfg.titleType == 0 ? text = headCfg.title + modeName : text = modeName + headCfg.title;
        this._headName.text = text;
    }


    //部件换装(不含宠物、头衔)
    public async setPartDress(type: DressType, id: number) {
        await this.waitSlotReady(type);
        //删除旧的
        if (this._slotDataMap.has(type)) {
            let obj = this._slotDataMap.get(type).obj;
            if (obj) { GameObjPool.despawn(obj); }
            this._slotDataMap.delete(type);
        }
        if (!id) {
            this._slotDataMap.delete(type);
            return;
        }
        let data: slotData = { cfgId: id, obj: null };
        let decorationCfg = GameConfig.Decoration.getElement(id);
        if (!decorationCfg) {
            console.error('str=装扮部件未找到=' + id);
            return;
        }
        let spawType = decorationCfg.isPrefab == 1 ? GameObjPoolSourceType.Prefab : GameObjPoolSourceType.Asset;
        let slotObj = await GameObjPool.asyncSpawn(decorationCfg.guid, spawType);
        this._model.attachToSlot(slotObj, NonHumanoidSlotType.Root);
        if (type == DressType.Effect) {
            let eff = slotObj as Effect;
            eff.loop = true;
            eff.play();
        }
        this.changeLocRot(id, type, slotObj);
        data.obj = slotObj;
        this._slotDataMap.set(type, data);
    }

    //更新挂件位置(不含宠物、头衔)
    private changeLocRot(cfgId: number, type: DressType, obj: GameObject) {
        let decorationCfg = GameConfig.Decoration.getElement(cfgId);
        let offect: Vector = Vector.zero;
        switch (type) {
            case DressType.Back:
                offect = this._modelCfg.backPos.clone().add(decorationCfg.pos);
                break;
            case DressType.Shoulder:
                offect = this._modelCfg.shoulderPos.clone().add(decorationCfg.pos);
                break;
            case DressType.Tail:
                offect = this._modelCfg.trailPos.clone().add(decorationCfg.pos);
                break;
            case DressType.Effect:
                offect = this._modelCfg.effectPos.clone().add(decorationCfg.pos);
                break;
        }
        obj.localTransform.position = offect;
        obj.localTransform.rotation = new Rotation(decorationCfg.rot);
        obj.worldTransform.scale = decorationCfg.scale;
        obj.setVisibility(mw.PropertyStatus.On, true);
    }

    //清除插槽物品
    public clearSuit() {
        this._slotDataMap.forEach((value: slotData, key: DressType) => {
            if (!value.obj) return;
            GameObjPool.despawn(value.obj);
        });
        this._slotDataMap.clear();
        this._playerName.visibility = SlateVisibility.SelfHitTestInvisible;
        this._headName.visibility = SlateVisibility.Collapsed;
    }



    private async waitSlotReady(type: DressType) {
        if (!this._slotDataMap.has(type) || this._slotDataMap.get(type).obj) {
            return true
        }
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                if (this._slotDataMap.get(type).obj) {
                    clearInterval(timer)
                    resolve(true)
                }
            }, 100)
        })
    }

}
