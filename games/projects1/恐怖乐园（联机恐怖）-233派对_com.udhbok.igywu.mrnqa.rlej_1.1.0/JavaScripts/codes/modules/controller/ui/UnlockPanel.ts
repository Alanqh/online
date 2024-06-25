/*
 * @Author       : dal
 * @Date         : 2024-03-19 18:37:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-26 11:02:28
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\controller\ui\UnlockPanel.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import Unlock_UI_Generate from "../../../../ui-generate/ShareUI/unlock/Unlock_UI_generate";
import { LanUtil } from "../../../utils/LanUtil";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import UnlockTips from "./UnlockTips";


export default class UnlockPanel extends Unlock_UI_Generate {

    protected onStart() {
        this.btn_back.onClicked.add(() => {
            UIService.hideUI(this);
        });

        this.btn_unlcok.onClicked.add(() => {
            UIService.show(UnlockTips, this.cfg, this.price);
        });
    }

    private cfg: IItemElement;

    private price: number = 999999;

    private readonly MaxDamage = 120;

    private readonly FastestShoot = 20;

    private readonly MostBullet = 60;

    protected onShow(cfgId: number, price: number, isUnlock: boolean) {
        this.cfg = GameConfig.Item.getElement(cfgId);
        this.price = price;
        if (!this.cfg) { return; }


        this.text_name.text = this.cfg.name;
        this.text_desc.text = this.cfg.description;
        this.img_icon.imageGuid = this.cfg.icon;
        this.text_moneynum.text = this.price + "";

        this.img_itembg.imageGuid = GameConfig.ItemQuality.getElement(this.cfg.quality).imgGuid;

        if (isUnlock) {
            this.btn_unlcok.enable = false;
            this.text_unlcok.text = LanUtil.getText("Code_005");
        } else {
            this.btn_unlcok.enable = true;
            this.text_unlcok.text = LanUtil.getText("Code_006");
        }

        GhostTraceHelper.uploadMGS("ts_interact_dj", "玩家进入购买武器触发器上发", { play_type: isUnlock ? 1 : 0, role_id: this.cfg.id });

        if (this.cfg.clazz != "HotWeaponItem") { return; }
        const hotWeaponCfg = GameConfig.HotWeapon.getElement(this.cfg.clazzParam[0]);
        this.text_dataNum1.text = hotWeaponCfg.damage + "";
        this.playAni(this.progressBar, hotWeaponCfg.damage / this.MaxDamage);
        const shoot = Math.max(Math.floor(1e3 / hotWeaponCfg.fireInter), 1);
        this.text_dataNum1_1.text = `${shoot}${LanUtil.getText("Code_007")}`;
        this.playAni(this.progressBar_1, shoot / this.FastestShoot);
        this.text_dataNum1_2.text = hotWeaponCfg.bulletNum + "";
        this.playAni(this.progressBar_2, hotWeaponCfg.bulletNum / this.MostBullet);
    }

    private tweenList: Tween<any>[] = [];

    protected onHide() {
        this.tweenList.forEach(tween => {
            tween.stop();
        });
        this.tweenList.length = 0;
    }

    private playAni(progress: ProgressBar, toValue: number) {
        this.tweenList.push(new Tween({ value: 0 })
            .to({ value: toValue }, 5e2)
            .onUpdate((delta) => {
                progress.currentValue = delta.value;
            })
            .start()
        );
    }
}