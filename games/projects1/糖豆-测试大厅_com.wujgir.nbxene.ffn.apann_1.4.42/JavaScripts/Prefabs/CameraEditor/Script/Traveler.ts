import { Camera } from "../../CameraRuntime/Script/Camera";
import { Data } from "../../CameraRuntime/Script/Data";
import { KeyAction } from "./KeyAction";
import { KeyBindings } from "./KeyBindings";
import TravelerUI from "./ui/TravelerUI";



/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-08 10:56:12
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-10-23 16:38:22
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\CameraEditor\Script\Traveler.ts
 * @Description  : 修改描述
 */
export namespace Traveler {
    let cameraSystem: UE.CameraComponent;
    let character: Character;
    const moveAxis = new UE.Vector(0, 0, 0);
    const FORWARD = new UE.Vector(20, 0, 0);
    const BACK = new UE.Vector(-20, 0, 0);
    const LEFT = new UE.Vector(0, -20, 0);
    const RIGHT = new UE.Vector(0, 20, 0);
    const UP = new UE.Vector(0, 0, -20);
    const DOWN = new UE.Vector(0, 0, 20);
    let isRunning: any = null;
    let lastPoint: mw.Vector2 = null;
    let result: mw.Vector2 = new mw.Vector2();
    let _currentTime: number = 0;
    async function ready() {
        if (!cameraSystem) {
            character = (await Player.asyncGetLocalPlayer()).character;
            character.movementEnabled = false;
            character.jumpEnabled = false;
            cameraSystem = mw.Camera.currentCamera["ueCamera"].CameraSystemComponent.CameraComponent as UE.CameraComponent;
            mw.UIService.show(TravelerUI);
            Event.addLocalListener("TravelerUI_TouchMove", cameraRot);
            Event.addLocalListener("TravelerUI_TouchBegin", () => {
                lastPoint = null;
            });
            Event.addLocalListener("Timeline_Time", (time: number) => {
                _currentTime = time;
            });

        }
    }

    function cameraRot(point: mw.Vector2) {
        if (isRunning) {
            if (lastPoint && cameraSystem) {
                mw.Vector2.subtract(point, lastPoint, result);
                const rot = cameraSystem.K2_GetComponentRotation();
                rot.Yaw += result.x * 0.1;
                const pitch = rot.Pitch - result.y * 0.1;
                rot.Pitch = MathUtil.clamp(pitch, -80, 80);
                cameraSystem.K2_SetWorldRotation(rot, false, null, false);
            }
            lastPoint = point;
        }
    }

    export async function start() {
        await ready();
        mw.Camera.currentCamera.rotationMode = mw.CameraRotationMode.RotationFixed;
        mw.Camera.currentCamera.positionMode = mw.CameraPositionMode.PositionFixed;
        isRunning = setInterval(onUpdate, 1);
    }
    export function stop() {
        isRunning && clearInterval(isRunning);
        isRunning = null;
        lastPoint = null;
    }
    export function currentData(): Data {
        const rot = cameraSystem.K2_GetComponentRotation();
        const loc = cameraSystem.K2_GetComponentLocation();
        return new Data(_currentTime, [loc.X, loc.Y, loc.Z], [rot.Roll, rot.Pitch, rot.Yaw]);
    }
    function addMove(speed: UE.Vector) {
        let percent = KeyBindings.isKeyPress(KeyAction.HoldSpeedup) ? 2 : 1;
        moveAxis.X += speed.X * percent;
        moveAxis.Y += speed.Y * percent;
        moveAxis.Z += speed.Z * percent;
    }
    function onUpdate() {
        if (Camera.getPlayer().isPlaying) return;
        const rot = cameraSystem.K2_GetComponentRotation();
        const loc = cameraSystem.K2_GetComponentLocation();
        moveAxis.X = moveAxis.Y = moveAxis.Z = 0;
        let isChanged = false;
        if (KeyBindings.isKeyPress(KeyAction.CameraForward)) {
            addMove(rot.RotateVector(FORWARD));
            isChanged = true;
        }
        if (KeyBindings.isKeyPress(KeyAction.CameraBack)) {
            addMove(rot.RotateVector(BACK));
            isChanged = true;
        }
        if (KeyBindings.isKeyPress(KeyAction.CameraUp)) {
            addMove(rot.RotateVector(UP));
            isChanged = true;
        }
        if (KeyBindings.isKeyPress(KeyAction.CameraDown)) {
            addMove(rot.RotateVector(DOWN));
            isChanged = true;
        }
        if (KeyBindings.isKeyPress(KeyAction.CameraLeft)) {
            addMove(rot.RotateVector(LEFT));
            isChanged = true;
        }
        if (KeyBindings.isKeyPress(KeyAction.CameraRight)) {
            addMove(rot.RotateVector(RIGHT));
            isChanged = true;
        }
        isChanged && cameraSystem.K2_SetWorldLocation(loc.op_Addition(moveAxis), false, null, false);

    }
}