/*
 * @Author       : dal
 * @Date         : 2024-05-09 19:24:34
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-28 13:56:49
 * @FilePath     : \1001_hall\JavaScripts\codes\ui\items\ReItemUI.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { IShopElement } from "../../../config/Shop";
import UseReItem_UI_Generate from "../../../ui-generate/ShareUI/props/UseReItem_UI_generate";
import { BagDefine, BagItemData } from "../../modules/bag/BagDefine";
import { BagModuleC } from "../../modules/bag/BagModuleC";
import { RelifeItem } from "../../modules/equip/items/RelifeItem";
import { UIBuyFix } from "../../modules/store/ui/UIBuyGiftBag";
import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { GhostTraceHelper } from "../../utils/TraceHelper";

export class ReItemUI extends UseReItem_UI_Generate {
    private _relifeCfg: IItemElement;

    private _callBack: (res: boolean, guid: string) => void;

    private _shopCfg: IShopElement;

    onStart() {
        this.layer = UILayerTop;
        this.btn_useItem.onClicked.add(() => {
            let count = this.getItemCount();

            if (count == 0) {
                if (this._shopCfg) {
                    UIService.show(UIBuyFix, this._shopCfg.id, 1, (res: boolean) => {
                        GhostTraceHelper.uploadMGS("ts_action_unlock_chat", "弹出复活币购买框", { chat_id: res ? 0 : 1 });
                    });
                }
                else {
                    Tips.show(LanUtil.getText("hint_tips1"))
                }
            }
            else {
                let bagModC = ModuleService.getModule(BagModuleC);
                bagModC.reqChangeItemCount(-1, this._relifeCfg.id);
                UIService.hideUI(this);

                this._callBack(true, this._relifeCfg.clazzParam ? this._relifeCfg.clazzParam[2] : "");
                SoundService.playSound(this._relifeCfg.clazzParam ? this._relifeCfg.clazzParam[0] : "", Number(this._relifeCfg.clazzParam[1]));
                Tips.show(LanUtil.getText("relife_success"))
            }

        })
        this.btn_escapeFailure.onClicked.add(() => {
            UIService.hideUI(this);
            this._callBack(false, "");
        })
        this._relifeCfg = GameConfig.Item.getAllElement().find(e => {
            return e.clazz == RelifeItem.name;
        })
        if (!this._relifeCfg) {
            console.error("ReItem:" + "卑职无能，不能找到复活卡")
        }
        else {
            this._shopCfg = GameConfig.Shop.getAllElement().find(e => {
                return e.itemID == this._relifeCfg.id;
            })
        }
        Event.addLocalListener(BagDefine.AddItemEvt, (itemData: BagItemData) => {
            if (!this.visible || !this._relifeCfg) {
                return;
            }

            if (itemData.cfgId == this._relifeCfg.id) {
                this.text_num.text = this.getItemCount() + "";
            }
        })
    }

    onShow(callback: (res: boolean) => void) {

        Event.dispatchToLocal("OnDeathPanelShow");

        this._callBack = callback;
        if (!this._relifeCfg) {
            UIService.hideUI(this);
            this._callBack(false, "");
            return;
        }
        this.text_num.text = this.getItemCount() + "";
        this.img_icon2.imageGuid = this._relifeCfg.icon;
        this.img_icon1.imageGuid = this._relifeCfg.icon;
        this.text_question.text = CommonUtils.formatString(LanUtil.getText("ReItem_01"), this._relifeCfg.name);
        GhostTraceHelper.uploadMGS("ts_action_unlock_atlas", "进入死亡界面", { atlas_id: this.getItemCount() == 0 ? 0 : 1 });
    }


    private getItemCount() {
        if (!this._relifeCfg) {
            console.error("没有提示卡道具配置！")
            return 0;
        }
        let itemNum = 0;
        itemNum = ModuleService.getModule(BagModuleC).getAllItemCountByCfgId(this._relifeCfg.id)
        return itemNum;
    }
}