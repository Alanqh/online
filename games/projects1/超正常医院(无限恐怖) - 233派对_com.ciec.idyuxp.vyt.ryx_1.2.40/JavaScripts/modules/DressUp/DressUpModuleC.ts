import DressUpModuleData from "./DressUpModuleData";
import { GameConfig } from "../../config/GameConfig";
import P_Game_HUD from "../GameHud/UI/P_Game_HUD";
import { P_HUD } from "../GameHud/UI/P_HUD";
import DressUpModuleS from "./DressUpModuleS";
import P_SelfDress from "./UI/P_SelfDress";
import { DressUpItemData, DressUpTab1, DressUpTab2 } from "./DressData";
import P_PropBar from "../Bag/P_PropBar";
import { IDressElement } from "../../config/Dress";
import { PlayerRace, ShopFirstDo, ShopType, TabType } from "../../const/enum";
import { ShopModuleC } from "../Shop/ShopModuleC";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import { GlobalData } from "../../const/GlobalData";
import P_DressItem from "./UI/P_DressItem";
import P_HeadCard from "./UI/P_HeadCard";
import { MonsterChangeS } from "../ChangeMonster/MonsterChangeS";
import { MonsterChangeC } from "../ChangeMonster/MonsterChangeC";


export default class DressUpModuleC extends ModuleC<DressUpModuleS, DressUpModuleData> {

    /**装扮主入口 */
    // private mainUI: P_DressMain;
    /**个人装扮页面 */
    private selfUI: P_SelfDress;
    private isShow: boolean = false;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        // this.mainUI = UIService.getUI(P_DressMain);
        this.selfUI = UIService.getUI(P_SelfDress);

        // 添加(装备、卸载、购买)按钮点击事件
        this.addButtonClickLinstener();
        // 添加二级页签点击监听
        this.addTab2ClickLinstener();
        // 添加装备装备与选中状态监听
        this.addEquipSelectLinstener();
        
        this.addEventListener();
        this.addRotateLinstener();

        UIService.getUI(P_Game_HUD).mButton_Dress.onClicked.add(() => {
            this.openDress();
        });

        this.selfUI.onCurSelectTab1ChangeAC.add((newTab1, oldTab1) => {
            if (newTab1.conf.id == DressUpTab1.Pendant)
                ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.decorate_click);
        })
    }

    protected async onEnterScene(sceneType: number): Promise<void> {
        await this.init();
        this.refreshDressBag(true);
    }

    private addEventListener() {
        this.data.onDressChange.add(this.refreshDressBag.bind(this));
        this.data.onDressChange.add(()=>{
            this.selfUI.refreshBtn(this.selfUI.curSelectDressUI);
        });
        // this.mainUI.mButton_Close.onClicked.add(() => {
        //     this.mainUI.hide();
        //     if (this.isShow) {
        //         this.closeDress();
        //     }
        // });
        this.selfUI.mButton_Close.onClicked.add(() => {
            this.closeDress();
            this.ani?.stop();
        });
    }


    // 添加二级页签点击监听
    private addTab2ClickLinstener() {
        this.selfUI.onCurSelectTab2ChangeAC.add((newTab2Node, oldTab2Node) => {
            console.warn(`lwj 二级页签变更监听: ${newTab2Node.conf.tabName}`);
            let type = newTab2Node.conf.id;
            this.setCameraPos(type);
            if (type != DressUpTab2.LeftHand && type != DressUpTab2.RightHand)
                this.playAniByDressType(type);
        });
    }

    /**添加按钮(购买、装备、卸载)点击事件 */
    private addButtonClickLinstener() {
        // 购买
        this.selfUI.mButton_Buy.onClicked.add(() => {
            // 跳转到商城
            let id = this.selfUI.curSelectDressUI.node2.conf.id;
            switch (id) {
                case DressUpTab2.Death:
                    id = 2007;
                    break;
                case DressUpTab2.Enter:
                    id = 2008;
                    break;
                case DressUpTab2.HeadCard:
                    id = 2003;
                    break;
                case DressUpTab2.Backwear:
                    id = 2004;
                    break;
                case DressUpTab2.Headwear:
                    id = 2003;
                    break;
                case DressUpTab2.LeftHand:
                    id = 2005;
                    break;
                case DressUpTab2.LeftLeg:
                    id = 2006;
                    break;
                case DressUpTab2.RightHand:
                    id = 2005;
                    break;
                case DressUpTab2.RightLeg:
                    id = 2006;
                    break;
                default:
                    break;
            }
            ModuleService.getModule(ShopModuleC).showShop(ShopType.Shop, TabType.Pendant, id);

        })
    }

    /**添加装备和选中监听 */
    private addEquipSelectLinstener() {
        this.selfUI.tab1List.forEach((node1) => {
            node1.tab2NodeList.forEach((node2) => {
                node2.dressItemList.forEach((dressUI) => {
                    let tab = dressUI.node2.conf.id;
                    let id = dressUI.conf.id;
                    let conf = GameConfig.Dress.getElement(id);
                    // 装备
                    dressUI.onEquip.add(() => {
                        console.warn(`lwj 真 装`);
                        this.playerSlotId.set(tab, id);
                    })
                    // 取消装备
                    dressUI.onUnequip.add(() => {
                        console.warn(`lwj 真 卸`);
                        this.playerSlotId.set(tab, null);
                    })
                    // 选中
                    dressUI.onSelect.add(() => {
                        console.warn(`lwj 装扮装备 tab = ${tab} id = ${id}`);
                        // 装备试穿道具
                        if (conf.sourceType == DressUpTab1.Pendant || conf.sourceType == DressUpTab1.Effect) {
                            // 挂件和特效
                            this.changeDress(this._ShopNpc, tab, id);
                        } else if (conf.sourceType == DressUpTab1.Card) {
                            // 名片
                            this.changeCard(dressUI, true);
                        }
                    })
                    // 取消选中
                    dressUI.onUnselect.add(() => {
                        console.warn(`lwj 装扮卸下 tab = ${tab} id = ${id}`);
                        // 卸下试穿道具
                        if (conf.sourceType == DressUpTab1.Pendant || conf.sourceType == DressUpTab1.Effect) {
                            // 挂件和特效
                            this.changeDress(this._ShopNpc, tab, id);
                        } else if (conf.sourceType == DressUpTab1.Card) {
                            // 名片
                            this.changeCard(dressUI, false);
                        }
                    })
                })
            });
        });
    }


    //#region  NPC装扮
    private _ShopNpc: Character;
    private _shopCamera: Camera;
    private _originCamera: Camera;
    /**NPC身上挂件id */
    private _npcObjId: Map<DressUpTab2, number> = new Map();
    /**NPC身上装备物体 */
    private _npcSlotObj: Map<DressUpTab2, GameObject> = new Map();
    /**玩家实际插槽 */
    private playerSlotId: Map<DressUpTab2, number> = new Map();
    // 玩家头顶UI
    private playerHeadUI: P_HeadCard;


    private async init() {

        this._originCamera = Camera.currentCamera;
        Object.values(DressUpTab2).filter(v => !Number.isNaN(Number(v))).forEach((v) => {
            v = v as DressUpTab2;
            this._npcSlotObj.set(v, null);
            this._npcObjId.set(v, null);
            this.playerSlotId.set(v, null);
            // console.warn(`lwj ddddv = ${v} `);
        });
        this._ShopNpc = await GameObject.asyncFindGameObjectById("12746275") as Character;
        this._ShopNpc.displayName = this.localPlayer.nickname ?? "";
        GameObject.asyncFindGameObjectById("13718D9A").then((obj) => {
            this._shopCamera = obj as Camera;
        });

        // 初始化试穿npc头顶UI
        this.npcHeadUI = UIService.create(P_HeadCard);
        this._ShopNpc.overheadUI.setTargetUIWidget(this.npcHeadUI.uiWidgetBase);
        this.npcHeadUI.setNickName(this.localPlayer.playerId);
    }


    /**打开NPC装扮 */
    openDress() {
        this.isShow = true;
        this.selfUI.show();
        this.npcReset(this._ShopNpc);
        UIService.hide(P_HUD);
        UIService.hide(P_PropBar);
        UIService.hide(P_Game_HUD);
        // this._shopCamera.localTransform.position = GlobalData.DressUp.personalFilePos;
        // this._shopCamera.localTransform.rotation = GlobalData.DressUp.personalFileRot;
        Camera.switch(this._shopCamera, 0.3);

        ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.dress_click);
        ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.Title_Click);
    }


    /**切换摄像机位置 */
    public setCameraPos(cfgID: number) {
        let cfg = GameConfig.DressTab.getElement(cfgID);
        this._shopCamera.localTransform.position = cfg.cameraLocation;
        this._shopCamera.localTransform.rotation = new Rotation(cfg.cameraRotate.x, cfg.cameraRotate.y, cfg.cameraRotate.z);
    }

    /**关闭装扮 */
    closeDress() {
        this.isShow = false;
        console.warn(`lwj 关闭装扮`);
        Camera.switch(this._originCamera, 0.2);
        this.selfUI.hide();
        UIService.show(P_HUD);
        if (MonsterChangeC.curPlayerRace == PlayerRace.Human)
            UIService.show(P_PropBar);
        UIService.show(P_Game_HUD);

        //同步装扮
        this.server.net_UpdateDress(Array.from(this.playerSlotId.values()));
    }

    closeUI() {
        Camera.switch(this._originCamera, 0.2);
        this.selfUI.hide();
    }

    private is: boolean = false;
    /**重置NPC */
    private npcReset(npc: Character) {
        if (this.is) return;
        this.is = true;
        this.npcDress(npc);
    }

    /**npc换装 */
    npcDress(npc: Character) {
        AccountService.downloadData(npc, () => {
            this.npcEquip(npc, DressUpTab2.Backwear);
            this.npcEquip(npc, DressUpTab2.Headwear);
            this.npcEquip(npc, DressUpTab2.LeftHand);
            this.npcEquip(npc, DressUpTab2.LeftLeg);
            this.npcEquip(npc, DressUpTab2.RightHand);
            this.npcEquip(npc, DressUpTab2.RightLeg);
        });
    }

    /**npc初始外形 */
    private async npcEquip(npc: Character, type: DressUpTab2) {
        let data = this.data.getCurDressByTab2(type);
        // console.warn(`lwj 初始NPC装扮 ${type}   ${data}`);
        if (!data) {
            return;
        }

        let cfg = GameConfig.Dress.getElement(data.id);
        if (!cfg) {
            return;
        }
        let obj = this._npcSlotObj.get(type);
        if (obj) {
            console.warn(`lwj 初始NPC装扮 ${type}  不同 `);
            obj.parent = null;
            GameObjPool.despawn(obj);
        }

        obj = await this.spawnObj(npc, cfg);
        this._npcSlotObj.set(type, obj);
        this._npcObjId.set(type, cfg.id);
        this.playerSlotId.set(type, data.id);
    }

    private async spawnObj(npc: Character, cfg: IDressElement) {
        if (!cfg) return;
        console.log(`装扮guid: ${cfg.sourceGuid}`)
        let obj: GameObject = null;
        let guid = GlobalData.FollowNPC.npcGuidByIdMap.get(cfg.id);
        if (guid) {
            //派蒙
            console.warn(`lwj 派蒙 ${guid}`);
            obj = await GameObjPool.asyncSpawn(guid);
            let char = obj as Character;
            char.setDescription([guid])
            char.displayName = "";
        } else {
            obj = await GameObjPool.asyncSpawn(cfg.sourceGuid, GameObjPoolSourceType.Prefab);
        }
        (obj as Model).setCollision(PropertyStatus.Off, true);
        npc.attachToSlot(obj, cfg.sourcePoint);
        obj.localTransform.position = cfg.sourceLocation;
        obj.localTransform.rotation = new Rotation(cfg.sourceRotate)
        obj.localTransform.scale = cfg.sourceLarge;
        if (cfg.sourceType == DressUpTab1.Effect) {
            this.playEff(obj);
        }
        return obj;
    }

    /**播放特效 */
    private playEff(prefab: GameObject) {
        prefab.getChildren().forEach((v) => {
            if (v instanceof Effect) {
                v.stop();
                v.play();
            }
        });
    }

    /**切换外观 */
    private async changeDress(npc: Character, type: DressUpTab2, id: number) {
        this.playAniByDressType(type);
        let cfg = GameConfig.Dress.getElement(id);
        let lastId = this._npcObjId.get(type);

        if (!lastId) {
            let obj = await this.spawnObj(npc, cfg);
            this._npcSlotObj.set(type, obj);
            this._npcObjId.set(type, cfg.id);
        } else {
            if (id == lastId) {
                //相同卸载
                console.warn(`lwj 相同卸载 ${id}  ${lastId}`);
                let obj = this._npcSlotObj.get(type);
                obj.parent = null;
                GameObjPool.despawn(obj);
                this._npcSlotObj.set(type, null);
                this._npcObjId.set(type, null);
                return;
            } else {
                //不同 销毁
                console.warn(`lwj 不同 ${id}  ${lastId}`);
                let obj = this._npcSlotObj.get(type);
                obj.parent = null;
                GameObjPool.despawn(obj);
                if (!cfg) {
                    //卸载
                    console.warn(`lwj 卸载 ${id}  ${lastId}`);
                    this._npcSlotObj.set(type, null);
                    this._npcObjId.set(type, null);
                }
                //生成
                console.warn(`lwj 生成`);
                obj = await this.spawnObj(npc, cfg);
                this._npcSlotObj.set(type, obj);
                this._npcObjId.set(type, cfg.id);
            }
        }
    }

    private npcHeadUI: P_HeadCard; // 试穿npc头顶UI
    /**更换头顶名片 */
    changeCard(dressUI: P_DressItem, isEquip: boolean) {

        if (isEquip) {
            this.npcHeadUI.setHeadUI(Number(dressUI.conf.sourceGuid));
        } else {
            this.npcHeadUI.setHeadUI(null);
        }
    }
    private ani: Animation = null;

    /**播放动画 */
    private playAniByDressType(type: DressUpTab2) {
        if (type == DressUpTab2.LeftHand || type == DressUpTab2.RightHand) {
            if (this.ani) {
                this.ani.play();
                return;
            }
            this.ani = this._ShopNpc.loadAnimation(GlobalData.DressUp.dressGuid);
            this.ani.loop = 0;
            this.ani.play();
        } else {
            this.ani?.stop();
        }

    }

    //#endregion


    /**
     * 刷新装扮背包 (通过本地moduleData)
     * @param selectEquipedDress 是否选中已装备的装扮
     */
    public refreshDressBag(selectEquipedDress: boolean = false) {
        this.selfUI.refresh(this.data.getDressDataList(), selectEquipedDress);
    }

    public addDress(id: number) {
        let data = new DressUpItemData(id);
        this.server.net_AddDress(data)
    }

    /**添加换装旋转监听 */
    private addRotateLinstener() {
        this.selfUI.mVirtualJoystickPanel.onInputDir.add(dir => {
            this._ShopNpc.worldTransform.rotate(Vector.up, dir.x * -15);
        })
    }
}