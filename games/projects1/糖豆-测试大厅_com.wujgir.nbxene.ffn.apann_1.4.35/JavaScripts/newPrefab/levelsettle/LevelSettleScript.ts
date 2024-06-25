/** 
 * @Author       : weihao.xu
 * @Date         : 2023-12-13 15:48:04
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2024-01-08 11:33:06
 * @FilePath     : \stumbleguys_new\JavaScripts\newPrefab\levelsettle\LevelSettleScript.ts
 * @Description  : 修改描述
 */

import { CountDownUI } from "../../modules/ProcessModule/UI/CountDownUI";
import GameUI from "../../modules/ProcessModule/UI/GameUI";
import { BGMHelper } from "../../tool/BGMScript";
import TransitionUI from "../../TransitionUI";
import LevelSettleUI from "./LevelSettleUI";

@Component
export default class LevelSettleScript extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Player.asyncGetLocalPlayer().then((player) => {
            let isChampion = false;
            Event.addLocalListener("CHAMPION_INIT", (name: string, skin: string) => {
                isChampion = name === player.character.displayName;
            });
            Event.addLocalListener("LEVEL_SETTLE", () => {
                let camera = this.gameObject.getChildByName("camera") as Camera;
                let position = this.gameObject.getChildByName("playerLoc").worldTransform.position;
                let crown = this.gameObject.getChildByName("皇冠") as Effect;
                player.character.ragdollEnabled = false;
                player.character.setVisibility(mw.PropertyStatus.On, false);
                player.character.worldTransform.position = position;
                player.character.worldTransform.rotation = Vector.subtract(camera.worldTransform.position, position).toRotation();
                player.character.worldTransform.scale = new Vector(2, 2, 2);
                player.character.overheadUI.setVisibility(mw.PropertyStatus.On);
                player.character.collisionWithOtherCharacterEnabled = false;
                Player.getAllPlayers().forEach((i) => {
                    if (i.character.gameObjectId !== player.character.gameObjectId) {
                        i.character.setVisibility(mw.PropertyStatus.Off);
                    }
                });
                if (crown) {
                    isChampion ? crown.play() : crown.forceStop();
                }
                UIService.hide(GameUI);
                UIService.hide(CountDownUI);
                UIService.show(TransitionUI, () => {
                    UIService.show(LevelSettleUI, isChampion);
                    Camera.switch(camera);
                })
                BGMHelper.stopBGM();
                // 这个bgm本身有点延迟，先播
                Event.dispatchToLocal("PLAY_BY_CFG", 70);
            });
        });
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}