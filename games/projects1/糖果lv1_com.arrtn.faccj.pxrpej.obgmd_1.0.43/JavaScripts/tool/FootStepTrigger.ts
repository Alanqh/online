/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-04-17 17:55:23
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-08-04 09:48:06
 * @FilePath     : \stumbleguys\JavaScripts\tool\FootStepTrigger.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../config/GameConfig";
import { ToolUtils } from "../modules/dress/ToolUtils";
import { Utils } from "./Utils";

export namespace FootStepHelper {
    let _leftTrigger: mw.Trigger;
    let _rightTrigger: mw.Trigger;
    let _stepSound: mw.Sound;
    let _stepTimer = 0;
    let _stepInterval: number = 0.2;
    let _ignoreList: string[] = [];
    export function init() {
        Player.asyncGetLocalPlayer().then(async (player) => {
            await Utils.downloadAsset("Trigger");
            _leftTrigger = ToolUtils.spawnGo<mw.Trigger>("Trigger");
            _rightTrigger = ToolUtils.spawnGo<mw.Trigger>("Trigger");

            const stepSound = GameConfig.Voice.getElement(8).guids[0];
            await Utils.downloadAsset(stepSound);
            _stepSound = ToolUtils.spawnGo<mw.Sound>(stepSound);
            if (!_stepSound) return;
            _stepSound.isSpatialization = false;
            _stepSound.volume = 1;
            _stepSound.isLoop = false;

            let character = player.character;

            if (_leftTrigger) {
                character.attachToSlot(_leftTrigger, mw.HumanoidSlotType.LeftFoot);
                _leftTrigger.worldTransform.scale = new mw.Vector(0.1, 0.1, 0.1);
                _leftTrigger.localTransform.position = new mw.Vector(0, 0, 0);
                _leftTrigger.onEnter.add((go) => {
                    if (go && !_ignoreList.includes(go.gameObjectId)) {
                        playSound();
                    }
                });
            }

            if (_rightTrigger) {
                character.attachToSlot(_rightTrigger, mw.HumanoidSlotType.RightFoot);
                _rightTrigger.worldTransform.scale = new mw.Vector(0.1, 0.1, 0.1);
                _rightTrigger.localTransform.position = new mw.Vector(0, 0, 0);
                _rightTrigger.onEnter.add((go) => {
                    if (go && !_ignoreList.includes(go.gameObjectId)) {
                        playSound();
                    }
                });
            }
        });
    }

    export function onUpdate(dt: number) {
        _stepTimer += dt;
    }

    function playSound() {
        if (_stepTimer >= _stepInterval) {
            _stepSound.stop();
            _stepSound?.play();
            _stepTimer = 0;
        }
    }
}