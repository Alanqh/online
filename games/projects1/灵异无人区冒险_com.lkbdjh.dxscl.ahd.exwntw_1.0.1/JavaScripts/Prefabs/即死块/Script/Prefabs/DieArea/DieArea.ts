import { PlayerManagerExtesion, } from '../../../../../Modified027Editor/ModifiedPlayer';
/*

 * @Date: 2023-07-19 09:41:27

 * @LastEditTime: 2023-07-19 10:03:12
 * @FilePath: \commonprefab\JavaScripts\Prefabs\即死块\Script\Prefabs\DieArea\DieArea.ts
 * @Description: 
 */
/*
 * @Description: Description
 */
import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent"; import { PrefabReport } from '../../../../../prefabEvent/PrefabReport';
;

@Component
export default class DieArea extends mw.Script {
    @mw.Property({ displayName: "伤害值" })
    public damage: number = 100;
    @PrefabReport(4)
    onStart() {

        if (mw.SystemUtil.isServer()) {
            const handle = setInterval(async () => {

                if (this.gameObject == null) return;

                await this.gameObject.asyncReady();
                clearInterval(handle);

                let trigger = this.gameObject as mw.Trigger;

                trigger.onEnter.add((go: mw.GameObject) => {
                    if (PlayerManagerExtesion.isCharacter(go)) {

                        PrefabEvent.PrefabEvtFight.hurt(this.gameObject.gameObjectId, go.gameObjectId, this.damage);

                    }
                })

            }, 100);
        }

    }

}