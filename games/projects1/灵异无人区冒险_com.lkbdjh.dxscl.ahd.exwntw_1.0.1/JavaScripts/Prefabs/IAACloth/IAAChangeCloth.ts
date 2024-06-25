/*

 * @Date: 2023-07-19 09:41:27

 * @LastEditTime: 2023-09-11 13:16:07
 * @FilePath: \commonprefab\JavaScripts\Prefabs\IAACloth\IAAChangeCloth.ts
 * @Description: 
 */
import { PrefabEvent } from "../../prefabEvent/PrefabEvent";
import { PrefabReport } from "../../prefabEvent/PrefabReport";
import MessageBoxUI from "../common/MessageBox";
import { IAAUtil } from "../Tools/IAAUtil";

@Component
export default class IAAChangeCloth extends mw.Script {
    @mw.Property({ displayName: "UI提示语" })
    public tipsLan: string = "观看广告即可换装！"

    @mw.Property({ displayName: "是否显示模特" })
    public isShowNpc: boolean = true;

    @mw.Property({ displayName: "角色数据Id", group: "换装数据" })
    public role: string = "";

    @mw.Property({ displayName: "前发", asset: AssetType.Cloth, group: "换装数据" })
    public frontHair: string = "";

    @mw.Property({ displayName: "后发", asset: AssetType.Cloth, group: "换装数据" })
    public backHair: string = "";

    @mw.Property({ displayName: "手套", asset: AssetType.Cloth, group: "换装数据" })
    public gloves: string = "";

    @mw.Property({ displayName: "鞋子", asset: AssetType.Cloth, group: "换装数据" })
    public shoes: string = "";

    @mw.Property({ displayName: "上衣", asset: AssetType.Cloth, group: "换装数据" })
    public upBody: string = "";

    @mw.Property({ displayName: "下衣", asset: AssetType.Cloth, group: "换装数据" })
    public lowBody: string = "";

    private _isSync: boolean = true;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    @PrefabReport(31)
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        let trigger = this.gameObject as mw.Trigger
        trigger.onEnter.add(this.client_OnEnterTrigger.bind(this))
        this.initNpc();
    }

    /**
     * 初始化Npc
     */
    private async initNpc() {
        let npc = this.gameObject.getChildByName("npc") as mw.Character;
        await npc.asyncReady();
        if (!this.isShowNpc) {
            npc.setVisibility(PropertyStatus.Off);
            return;
        }
        npc.displayName = "";
        npc.onDescriptionChange.add(() => {
            npc.syncDescription();
            this.dressOnParts(npc)
        });
        this.dressOn(npc, false);
    }

    /**
     * 给一个V2对象换装
     * @param v2 换装对象
     * @param isSync 是否同步
     */
    private dressOn(v2: Character, isSync: boolean = true) {
        this._isSync = isSync;
        if (this.role != "") {
            v2.setDescription([this.role]);
            if (isSync){v2.syncDescription()};
        }
        else {
            this.dressOnParts(v2)
        }
    }

    /**
     * 换装剩余部分
     * @param v2 换装对象
     * @param isSync 是否同步
     */
    private dressOnParts(v2: Character) {
        let isSync = this._isSync;
        if (this.frontHair != "") {
            v2.description.advance.hair.frontHair.style = this.frontHair, isSync;
        }
        if (this.backHair != "") {
            v2.description.advance.hair.backHair.style = this.backHair, isSync;
        }
        if (this.gloves != "") {
            v2.description.advance.clothing.gloves.style = this.gloves, isSync;
        }
        if (this.shoes != "") {
            v2.description.advance.clothing.shoes.style = this.shoes, isSync;
        }
        if (this.upBody != "") {
            v2.description.advance.clothing.upperCloth.style = this.upBody, isSync;
        }
        if (this.lowBody != "") {
            v2.description.advance.clothing.lowerCloth.style = this.lowBody, isSync;
        }
    }

    /**
     * 家你听角色进入触发器
     * @param character 进入的角色
     */
    private client_OnEnterTrigger(character: mw.Character) {
        if (!character.player) {
            return;
        }
        if (character.player.playerId == Player.localPlayer.playerId) {
            MessageBoxUI.showTwoBtnMessage("", this.tipsLan, (res) => {
                if (res) {
                    IAAUtil.playAds((res) => {
                        if (res) {
                            this.dressOn(character);
                        }
                    })
                }
            }, "观看广告"
                , "取消");

        }

    }
}