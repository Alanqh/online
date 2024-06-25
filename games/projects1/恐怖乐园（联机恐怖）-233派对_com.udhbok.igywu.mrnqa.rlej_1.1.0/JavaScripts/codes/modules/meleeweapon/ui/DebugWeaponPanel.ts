/*
 * @Author       : dal
 * @Date         : 2024-06-17 11:14:42
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-17 14:43:17
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\meleeweapon\ui\DebugWeaponPanel.ts
 * @Description  : 
 */

import { AddGMCommand } from "module_gm";
import DebugWeapon_Generate from "../../../../ui-generate/ShareUI/utils/DebugWeapon_generate";
import Tips from "../../../utils/Tips";
import { EquipModuleC } from "../../equip/EquipModuleC";
import EquipScript from "../../equip/EquipScript";
import MeleeWeaponModuleC from "../MeleeWeaponC";

AddGMCommand("打开调试面板", (player, value) => {
    UIService.show(DebugWeaponPanel);
}, null, "屏幕物品");

class DebugItem {

    public barArr: ProgressBar[] = [];

    public inputArr: InputBox[] = [];

    public constructor(public barCan: Canvas, public inputCan: Canvas, public type: number) {
        this.barArr.push(this.barCan.getChildAt(0) as ProgressBar);
        this.barArr.push(this.barCan.getChildAt(1) as ProgressBar);
        this.barArr.push(this.barCan.getChildAt(2) as ProgressBar);
        this.inputArr.push(this.inputCan.getChildAt(0) as InputBox);
        this.inputArr.push(this.inputCan.getChildAt(1) as InputBox);
        this.inputArr.push(this.inputCan.getChildAt(2) as InputBox);
        this.barArr.forEach((bar, axis) => {
            bar.onSliderValueChanged.add((v) => {
                this.inputArr[axis].text = v + "";
                // 位置
                if (type == 1) {
                    this.selfPanel.updatePos(this.inputArr[0].text, this.inputArr[1].text, this.inputArr[2].text);
                }
                // 旋转
                else {
                    this.selfPanel.updateRot(this.inputArr[0].text, this.inputArr[1].text, this.inputArr[2].text);
                }
            });
        });

        this.inputArr.forEach((inputBox, axis) => {
            inputBox.onTextChanged.add((v) => {
                this.barArr[axis].currentValue = Number(v);
                // 位置
                if (type == 1) {
                    this.selfPanel.updatePos(this.inputArr[0].text, this.inputArr[1].text, this.inputArr[2].text);
                }
                // 旋转
                else {
                    this.selfPanel.updateRot(this.inputArr[0].text, this.inputArr[1].text, this.inputArr[2].text);
                }
            });
        });
    }

    public copyStr() {
        StringUtil.clipboardCopy(`${this.inputArr[0].text}|${this.inputArr[1].text}|${this.inputArr[2].text}`);
    }

    public pasteStr() {
        let str: string = StringUtil.clipboardPaste();
        str.split("|").map((v) => Number(v)).forEach((v, index) => {
            this.inputArr[index].text = v + "";
        });
        if (this.type == 1) {
            this.selfPanel.updatePos(this.inputArr[0].text, this.inputArr[1].text, this.inputArr[2].text);
        } else {
            this.selfPanel.updateRot(this.inputArr[0].text, this.inputArr[1].text, this.inputArr[2].text);
        }
    }

    public setData(x, y, z) {
        this.inputArr[0].text = x + "";
        this.inputArr[1].text = y + "";
        this.inputArr[2].text = z + "";
        this.barArr[0].currentValue = x;
        this.barArr[1].currentValue = y;
        this.barArr[2].currentValue = z;
    }

    private get selfPanel() {
        return UIService.getUI(DebugWeaponPanel);
    }
}

export default class DebugWeaponPanel extends DebugWeapon_Generate {

    public script: EquipScript;

    public posTemp: Vector[] = [Vector.zero, Vector.zero];

    public rotTemp: Rotation[] = [Rotation.zero, Rotation.zero];

    public updatePos(x: number | string, y: number | string, z: number | string) {
        let tempPos = this.posTemp[this.posSelectIndex];
        tempPos.x = Number(x);
        tempPos.y = Number(y);
        tempPos.z = Number(z);
        this.script["_screenGoLocOffset"] = tempPos.clone();
        this.script["updateScreenItemPos"]();
    }

    public updateRot(x: number | string, y: number | string, z: number | string) {
        let tempRot = this.rotTemp[this.rotSelectIndex];
        tempRot.x = Number(x);
        tempRot.y = Number(y);
        tempRot.z = Number(z);
        this.script["_screenGoQuatOffset"] = tempRot.clone().toQuaternion();
        this.script["updateScreenItemPos"]();
    }

    protected onShow() {
        this.script = ModuleService.getModule(EquipModuleC)["_curItem"];
        if (!this.script || !this.script.screenGo) {
            Tips.show("请先装备道具");
            return;
        }
        this.posDropBtn.selectedOptionIndex = 0;
        this.rotDropBtn.selectedOptionIndex = 0;
        let goTrans = this.script.screenGo.localTransform;
        this.posItem.setData(goTrans.position.x, goTrans.position.y, goTrans.position.z);
        this.rotItem.setData(goTrans.rotation.x, goTrans.rotation.y, goTrans.rotation.z);
    }

    private posItem: DebugItem;

    private rotItem: DebugItem;

    protected onAwake() {
        super.onAwake();
        this.layer = UILayerTop;
        this.posItem = new DebugItem(this.posBarCan, this.posInputCan, 1);
        this.rotItem = new DebugItem(this.rotBarCan, this.rotInputCan, 2);
        this.closeBtn.onClicked.add(() => { UIService.hideUI(this) });
        this.emulateBtn.onClicked.add(this.emulate.bind(this));
        this.posCopyBtn.onClicked.add(() => { this.posItem.copyStr() });
        this.posPasteBtn.onClicked.add(() => { this.posItem.pasteStr() });
        this.rotCopyBtn.onClicked.add(() => { this.rotItem.copyStr() });
        this.rotPasteBtn.onClicked.add(() => { this.rotItem.pasteStr() });
        this.posDropBtn.onSelectionChangedEvent.add((item: string, select: mw.SelectInfo) => {
            let tempPos = this.posTemp[this.posSelectIndex];
            this.posItem.setData(tempPos.x, tempPos.y, tempPos.z);
        });
        this.rotDropBtn.onSelectionChangedEvent.add((item: string, select: mw.SelectInfo) => {
            let tempRot = this.rotTemp[this.rotSelectIndex];
            this.rotItem.setData(tempRot.x, tempRot.y, tempRot.z);
        });
    }

    private get posSelectIndex() {
        return this.posDropBtn.selectedOptionIndex;
    }

    private get rotSelectIndex() {
        return this.rotDropBtn.selectedOptionIndex;
    }

    private emulate() {
        ModuleService.getModule(MeleeWeaponModuleC).setAniInfo(this.posTemp[0], this.posTemp[1], this.rotTemp[0], this.rotTemp[1]);
    }
}