/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-18 16:04:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-03-19 15:30:22
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\ShellScript.ts
 * @Description  : 
 */

import { GameConfig } from "../../config/GameConfig";
import { WaitLoop } from "../utils/AsyncTool"
import { LanUtil } from "../utils/LanUtil";
import Tips from "../utils/Tips";
import LevelBase from "./Level/LevelBase";
import { ArchiveData } from "./archive/ArchiveHelper";

@Component
export default class ShellScript extends LevelBase {

    @mw.Property({ displayName: "海螺", capture: true })
    public conchGuid: string = ""

    @mw.Property({ displayName: "交互顺序" })
    public interOrder: number[] = [1, 2, 3, 4, 5]

    /**交互顺序索引 */
    private _interIndex: number = 0
    /**是否完成 */
    private _isComplete: boolean = false;

    /**音符的guid */
    private _noteMap: Map<number, mw.GameObject> = new Map();
    /**敲击贝壳guid */
    private _shellMap: Map<number, mw.GameObject> = new Map();
    /**海螺 */
    private _conch: mw.GameObject;
    /**遮挡的蛋 */
    private _egg: mw.GameObject;

    protected onStart(): void {
        WaitLoop.loop(() => { return this.gameObject }).then(() => {
            SystemUtil.isClient() ? this.init_client() : this.init_server()
        })
    }

    async init_client() {
        this._conch = await GameObject.asyncFindGameObjectById(this.conchGuid);
        for (let i = 1; i <= 5; ++i) {
            let obj = this.gameObject.getChildByName(`音符${i}`);
            this._noteMap.set(i, obj)
        }
        for (let i = 1; i <= 5; ++i) {
            let obj = this.gameObject.getChildByName(`贝壳${i}`);
            this._shellMap.set(i, obj)
        }
        this._egg = this.gameObject.getChildByName(`遮挡物`);

        Event.addLocalListener("evt_interConch", (gameObjectId: string) => {
            if (this.gameObject.gameObjectId != gameObjectId) return;
            this.noteTween()
        })

        Event.addLocalListener("evt_interShell", (gameObjectId: string, index: string) => {
            if (this._isComplete) return
            let curValue = this.interOrder[this._interIndex];
            if (!curValue) return
            // console.log("WWWWWWWWWWWWWWWWWWWWWWWWW",curValue,Number(index),index,"#",this._interIndex,"#",this.interOrder);
            if (curValue == Number(index)) {
                this._interIndex++
                if (this._interIndex == this.interOrder.length) {//完成解密
                    this._isComplete = true
                    console.log("贝壳解密完成！！！！");
                    this.save2Archive(1);
                    Tips.show(LanUtil.getText("tips_show_138"))
                    if (this._egg) {
                        this._egg.setVisibility(mw.PropertyStatus.Off, true)
                        this._egg.setCollision(mw.CollisionStatus.Off, true)
                    }
                }
            } else {
                this._interIndex = 0;
                TimeUtil.delaySecond(0.5).then(() => {
                    this._shellMap.forEach(e => {
                        Event.dispatchToLocal("evt_playTween", e.gameObjectId, "false");
                    })
                })

            }
        })
        super.onStart()
    }

    async noteTween() {
        for (let i = 0; i < this.interOrder.length; ++i) {
            let note = this._noteMap.get(this.interOrder[i])
            if (!note) continue
            Event.dispatchToLocal("evt_playTween", note.gameObjectId, "true");
            await TimeUtil.delaySecond(0.5)
        }
        await TimeUtil.delaySecond(1)
        for (let i = 0; i < this.interOrder.length; ++i) {
            let note = this._noteMap.get(this.interOrder[i])
            if (!note) continue
            Event.dispatchToLocal("evt_playTween", note.gameObjectId, "false");
        }
    }

    init_server() {
        super.onStart()
    }

    onLoadData(data: ArchiveData): void {
        let isUnlock = this.getSaveStatId(data);
        if (!isUnlock) {
            this._isComplete = false;
        } else {
            this._isComplete = true;
            Event.dispatchToLocal("evt_playTween", this._conch.gameObjectId);
        }
        if (this._egg) {
            this._egg.setVisibility(this._isComplete ? mw.PropertyStatus.Off : mw.PropertyStatus.On, true)
            this._egg.setCollision(this._isComplete ? mw.CollisionStatus.Off : mw.PropertyStatus.On, true)
        }
    }

}