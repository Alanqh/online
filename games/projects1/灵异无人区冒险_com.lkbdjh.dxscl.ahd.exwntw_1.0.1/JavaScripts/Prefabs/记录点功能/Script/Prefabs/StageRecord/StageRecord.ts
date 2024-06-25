import { PlayerManagerExtesion, } from '../../../../../Modified027Editor/ModifiedPlayer';
/*

 * @Date: 2023-07-19 09:41:27

 * @LastEditTime: 2023-09-22 11:02:37
 * @FilePath: \commonprefab\JavaScripts\Prefabs\记录点功能\Script\Prefabs\StageRecord\StageRecord.ts
 * @Description: 
 */
/*
 * @Description: Description
 */

import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent";
import { PrefabReport } from '../../../../../prefabEvent/PrefabReport';
;

export abstract class StageRecordPreDef extends mw.Script {


}

export abstract class StageRecordClient extends StageRecordPreDef {

    // @mw.Property({ displayName: "触发器id", group: "关卡配置" })
    // public triggerGuid: string = "";

    protected _trigger: mw.Trigger;

    @mw.Property({ displayName: "关卡(1为起始关卡)", group: "关卡信息" })
    public stage: number = 1;

    @mw.Property({ displayName: "强制存档", group: "关卡信息" })
    public forceSave: boolean = false;

    @mw.Property({ displayName: "是否存档", group: "关卡信息" })
    public isSave: boolean = true;
    @PrefabReport(5)
    protected onStart() {

        super.onStart();

        if (mw.SystemUtil.isClient()) {

            PrefabEvent.PrefabEvtRecordPoint.onSetRecordPoint((_senderGuid: string, targetGuid: string, stage: number) => {
                console.error("激活关卡 :  " + stage);
                if (stage != this.stage) {
                    return;
                }
                if (Player.localPlayer.character.gameObjectId == targetGuid) {
                    if (this.isSave) {
                        PrefabEvent.PrefabEvtNotify.notifyLocal("激活关卡" + stage + ",进度已保存");
                        PrefabEvent.PrefabEvtRank.setRankData(Player.localPlayer.character.gameObjectId, Player.localPlayer.character.name, stage, "score");
                    } else {
                        PrefabEvent.PrefabEvtNotify.notifyLocal("激活关卡" + stage + "");
                    }
                }
            })

        }

    }

    protected onUpdate(dt: number) {

        super.onUpdate(dt);

        if (mw.SystemUtil.isClient()) {

        }

    }

}

@Component
export default class StageRecordServer extends StageRecordClient {

    private _onEnter: any;
    private _onLeave: any;

    protected onStart() {

        super.onStart();

        if (mw.SystemUtil.isServer()) {

            const handle = setInterval(async () => {

                if (this.gameObject == null) return;

                clearInterval(handle);

                this._trigger = this.gameObject as mw.Trigger;

                this._onEnter = (async (go: mw.GameObject) => {

                    if (PlayerManagerExtesion.isCharacter(go)) {
                        let char = go as mw.Character;
                        console.log("进入触发器 : " + go.gameObjectId);
                        let curStage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(char.gameObjectId);//await PrefabEvent.DBServerTool.asyncGetValue<number>(char.player.getUserSystemId(), PrefabEvent.PrefabEvtRecordPoint.name)

                        if (curStage >= this.stage && !this.forceSave) {
                            return;
                        }

                        console.log("设置记录点");
                        PrefabEvent.PrefabEvtRecordPoint.setRecordPoint(char.gameObjectId, char.gameObjectId, this.stage, this.isSave);;
                        PrefabEvent.PrefabEvtRank.setRankData(go.gameObjectId, char.displayName, this.stage, "关卡");
                    }

                }).bind(this);

                this._trigger.onLeave.add((go: mw.GameObject) => {
                    console.log("离开触发器 : " + go.gameObjectId);
                })


                this._trigger.onEnter.add(this._onEnter);

                PrefabEvent.PrefabEvtRecordPoint.onBackRecordPoint(async (senderGuid: string, stage: number) => {
                    if (this.stage == stage) {
                        let go = await GameObject.asyncFindGameObjectById(senderGuid);

                        if (PlayerManagerExtesion.isCharacter(go)) {
                            let char = go as mw.Character;
                            go.worldTransform.position = (this.gameObject.worldTransform.position.clone().add(mw.Vector.up.multiply(char.collisionExtent.z / 2 + 10)));
                            PrefabEvent.PrefabEvtRank.setRankData(go.gameObjectId, char.displayName, this.stage, "关卡");
                        } else {
                            go.worldTransform.position = (this.gameObject.worldTransform.position.clone().add(mw.Vector.up.multiply(150)));
                        }
                    }
                })

            }, 100);

        }

    }

    protected onUpdate(dt: number) {

        super.onUpdate(dt);

        if (mw.SystemUtil.isServer()) {

        }

    }

}