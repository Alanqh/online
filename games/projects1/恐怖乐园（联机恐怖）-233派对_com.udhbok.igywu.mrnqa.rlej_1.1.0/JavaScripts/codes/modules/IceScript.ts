/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-18 11:10:13
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-18 11:28:48
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\IceScript.ts
 * @Description  : 
 */

import { WaitLoop } from "../utils/AsyncTool";
import LevelBase from "./Level/LevelBase";
import { ArchiveData } from "./archive/ArchiveHelper";
import { EquipDefine } from "./equip/EquipDefine";
import { TorchItem } from "./equip/items/TorchItem";
import { InterEvtData, ObjInterDefine } from "./inter/ObjInterDefine";

@Component
export default class IceScript extends LevelBase {

    @mw.Property({ group: "事件设置", displayName: "冰交互事件" })
    public interIceArr: InterEvtData[] = [new InterEvtData()]
    private _events: EventListener[] = []
    protected onStart(): void {
        super.onStart();
        WaitLoop.loop(() => { return this.gameObject }).then(() => {
            if (SystemUtil.isClient()) {
                this._events.push(Event.addLocalListener("evt_interIce", (gameObjectId: string) => {
                    if (this.gameObject.gameObjectId != gameObjectId) return;
                    let curItem = EquipDefine.getCurItemInstance();
                    if (!curItem) return
                    if ((curItem as TorchItem).fireType == 2) {
                        this.save2ArchiveAndUseItem(1);
                        ObjInterDefine.dispatchServerByData(this.interIceArr, this.gameObject.gameObjectId)
                    }
                }))
            }
        })
    }

    onLoadData(data: ArchiveData): void {
        const stat = this.getSaveStatId(data)
        console.log(this.gameObject.gameObjectId + "：" + stat)
        if (!stat) {
            return;
        }
        ObjInterDefine.dispatchServerByData(this.interIceArr, this.gameObject.gameObjectId)
    }


}