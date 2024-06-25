/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-10-10 18:10:31
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-10-10 18:22:23
 * @FilePath     : \stumbleguys_new\JavaScripts\Prefabs\CommonTrigger.ts
 * @Description  : 修改描述
 */

@Component
export default class CommonTrigger extends mw.Script {
    @mw.Property({ displayName: "触发器guid", capture: true })
    triggerGuid: string = ""

    localPlayer: mw.Player = null
    localCharacter: Character = null
    triggerObj: mw.Trigger = null

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (this.isRunningClient()) {
            Player.asyncGetLocalPlayer().then(async (player) => {
                this.localPlayer = player
                this.localCharacter = this.localPlayer.character
                await ModuleService.ready()
                await DataCenterC.ready()
                if (!this.triggerGuid) return;
                GameObject.asyncFindGameObjectById(this.triggerGuid).then((trigger: mw.Trigger) => {
                    if (!trigger) return;
                    this.triggerObj = trigger
                    this.triggerInit()
                    trigger.onEnter.add((obj) => {
                        this.triggerEnter(obj)
                        if (this.localCharacter === obj) {
                            this.triggerEnterSelf()
                        }
                        if (obj instanceof Character) {
                            this.triggerEnterCharacter(obj)
                        }
                    })
                    trigger.onLeave.add((obj) => {
                        this.triggerLeave(obj)
                        if (this.localCharacter === obj) {
                            this.triggerLeaveSelf()
                        }
                        if (obj instanceof Character) {
                            this.triggerLeaveCharacter(obj)
                        }
                    })
                })
            })
        }
    }

    triggerInit() { }
    triggerEnter(obj: mw.GameObject) { }
    triggerEnterSelf() { }
    triggerEnterCharacter(character: Character) { }
    triggerLeave(obj: mw.GameObject) { }
    triggerLeaveSelf() { }
    triggerLeaveCharacter(character: Character) { }
}